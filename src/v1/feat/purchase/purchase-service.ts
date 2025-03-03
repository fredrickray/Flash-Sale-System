import { BadRequest, ResourceNotFound } from '@middlewares/error-middleware';
import { PurchaseModel } from './purchase-model';
import { IPurchaseDocument } from './purchase-type';
import mongoose, { Types } from 'mongoose';
import { IUserDocument } from '@user/user-type';
import { ProductModel } from '@product/product-model';
import { Server, Socket } from 'socket.io';
import { UserModel } from '@user/user-model';

interface UserMap {
  [key: string]: string;
}

export default class PurchaseService {
  // private static io: Server;

  static initialize(socket: Socket, io: Server) {
    // this.io = io;
    console.log(`New client connected: ${socket.id}`);
    io.emit('client', `New client connected: ${socket.id}`);

    socket.on('join', async (username: string) => {
      const user = await UserModel.findOne({ username });
      if (user) {
        user.socketId = socket.id;
        await user.save();
        console.log(`User ${username} connected.`);
      }
    });

    socket.on('disconnect', async () => {
      await this.handleDisconnect(socket);
    });
  }

  public static async createPurchase(
    product: Types.ObjectId,
    payload: IPurchaseDocument,
    user: IUserDocument,
    io: Server
  ) {
    const session = await mongoose.startSession();
    session.startTransaction();
    console.log('Raeched here');
    console.log('user', user);
    try {
      const productExist = await ProductModel.findById(product);
      if (!productExist) throw new ResourceNotFound('Product not found');

      const now = new Date();
      if (now < productExist.startTime)
        throw new BadRequest('Flash sale is not active');

      if (!productExist.isActive) throw new BadRequest('Product is not active');

      if (productExist.totalUnit < payload.quantity)
        throw new BadRequest('Product unit left is less than quantity');

      if (payload.quantity > 5)
        throw new BadRequest('Max purchase limit per transaction is 5');

      // const updatedProduct = await ProductModel.findOneAndUpdate(
      //   { _id: product, totalUnit: { $gte: payload.quantity } },
      //   {
      //     $inc: { totalUnit: -payload.quantity },
      //     // $set: { version: productExist.__v + 1 },
      //   },
      //   { new: true, session }
      // );

      // if (!updatedProduct)
      //   throw new BadRequest('Race condition detected, try again');

      productExist.totalUnit -= payload.quantity;
      await productExist.save({ session });
      const purchase = await PurchaseModel.create(
        [{ ...payload, userId: user._id, productId: product }],
        { session }
      );
      await session.commitTransaction();
      console.log('After commit transaction');
      session.endSession();
      console.log('Aftter end session');

      if (io) {
        io.emit('stock_update', {
          productId: product.toString(),
          totalUnit: productExist.totalUnit,
        });
      } else {
        console.warn('Socket.io not initialized, cannot emit stock update');
      }

      return purchase;
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
        console.log('session aborted');
      }
      // await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  public static async getPurchaseById(id: Types.ObjectId) {
    const purchase = await PurchaseModel.findById(id);
    if (!purchase) throw new ResourceNotFound('Purchase not found');

    return purchase;
  }

  public static async leaderboard() {
    const leaderboard = await PurchaseModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      { $sort: { createdAt: 1 } },
      {
        $project: {
          _id: 0,
          rank: { $add: [1, { $indexOfArray: ['$userId', '$_id'] }] },
          user: {
            firstName: '$user.firstName',
            lastName: '$user.lastName',
          },
          quantity: '$quantity',
          createdAt: '$createdAt',
        },
      },
    ]);

    return leaderboard;
  }

  private static async handleDisconnect(socket: Socket) {
    const user = await UserModel.findOne({ socketId: socket.id });
    if (user) {
      user.socketId = null;
      await user.save();
      console.log(`User ${user.firstName} disconnected.`);
    }
    console.log(`Client disconnected: ${socket.id}`);
  }
}

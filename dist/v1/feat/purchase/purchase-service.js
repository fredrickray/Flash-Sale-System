"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_middleware_1 = require("../../../middlewares/error-middleware");
const purchase_model_1 = require("./purchase-model");
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("../product/product-model");
const user_model_1 = require("../user/user-model");
class PurchaseService {
    // private static io: Server;
    static initialize(socket, io) {
        // this.io = io;
        console.log(`New client connected: ${socket.id}`);
        io.emit('client', `New client connected: ${socket.id}`);
        socket.on('join', async (username) => {
            const user = await user_model_1.UserModel.findOne({ username });
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
    static async createPurchase(product, payload, user, io) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        console.log('Raeched here');
        console.log('user', user);
        try {
            const productExist = await product_model_1.ProductModel.findById(product);
            if (!productExist)
                throw new error_middleware_1.ResourceNotFound('Product not found');
            const now = new Date();
            const startDateTime = new Date(`${productExist.startDate.toISOString().split('T')[0]}T${productExist.startTime}:00.000Z`);
            console.log('now', now);
            console.log('startDateTime', startDateTime);
            if (now < startDateTime)
                throw new error_middleware_1.BadRequest('Flash sale is not active');
            if (!productExist.isActive)
                throw new error_middleware_1.BadRequest('Product is not active');
            if (productExist.totalUnit < payload.quantity)
                throw new error_middleware_1.BadRequest('Product unit left is less than quantity');
            if (payload.quantity > 5)
                throw new error_middleware_1.BadRequest('Max purchase limit per transaction is 5');
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
            const purchase = await purchase_model_1.PurchaseModel.create([{ ...payload, userId: user._id, productId: product }], { session });
            await session.commitTransaction();
            console.log('After commit transaction');
            session.endSession();
            console.log('Aftter end session');
            if (io) {
                io.emit('stock_update', {
                    productId: product.toString(),
                    totalUnit: productExist.totalUnit,
                });
            }
            else {
                console.warn('Socket.io not initialized, cannot emit stock update');
            }
            return purchase;
        }
        catch (error) {
            if (session.inTransaction()) {
                await session.abortTransaction();
                console.log('session aborted');
            }
            // await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    static async getPurchaseById(id) {
        const purchase = await purchase_model_1.PurchaseModel.findById(id);
        if (!purchase)
            throw new error_middleware_1.ResourceNotFound('Purchase not found');
        return purchase;
    }
    static async leaderboard() {
        const leaderboard = await purchase_model_1.PurchaseModel.aggregate([
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
                $group: {
                    _id: null,
                    purchases: { $push: '$$ROOT' },
                },
            },
            { $unwind: '$purchases' },
            {
                $project: {
                    _id: 0,
                    user: {
                        firstName: '$purchases.user.firstName',
                        lastName: '$purchases.user.lastName',
                    },
                    quantity: '$purchases.quantity',
                    createdAt: '$purchases.createdAt',
                },
            },
            {
                $sort: { createdAt: 1 },
            },
            {
                $group: {
                    _id: null,
                    purchases: { $push: '$$ROOT' },
                },
            },
            {
                $unwind: {
                    path: '$purchases',
                    includeArrayIndex: 'rank',
                },
            },
            {
                $project: {
                    _id: 0,
                    rank: { $add: ['$rank', 1] },
                    user: '$purchases.user',
                    quantity: '$purchases.quantity',
                    createdAt: '$purchases.createdAt',
                },
            },
        ]);
        // const leaderboard = await PurchaseModel.find()
        //   .sort({ createdAt: 1 })
        //   .populate('userId', 'firstName lastName');
        // // .select('quantity createdAt');
        // // .populate('user', 'firstName lastName');
        return leaderboard;
    }
    static async handleDisconnect(socket) {
        const user = await user_model_1.UserModel.findOne({ socketId: socket.id });
        if (user) {
            user.socketId = null;
            await user.save();
            console.log(`User ${user.firstName} disconnected.`);
        }
        console.log(`Client disconnected: ${socket.id}`);
    }
}
exports.default = PurchaseService;

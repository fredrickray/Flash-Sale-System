import { model, Schema, Types, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { IPurchaseDocument } from './purchase-type';

const purchaseSchema = new Schema<IPurchaseDocument>(
  {
    productId: { type: Schema.Types.ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

purchaseSchema.plugin(paginate);

export const PurchaseModel = model<
  IPurchaseDocument,
  PaginateModel<IPurchaseDocument>
>('purchase', purchaseSchema);

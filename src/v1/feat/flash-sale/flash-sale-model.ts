import { model, Schema, Types, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { IFlashSaleDocument } from './flash-sale-type';

const flashSaleSchema = new Schema<IFlashSaleDocument>(
  {
    product: { type: String, required: true },
    totalUnit: { type: Number, required: true, default: 200 },
    remainingUnit: { type: Number },
    startTime: { type: Date },
    endTime: { type: Date },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);

flashSaleSchema.plugin(paginate);

export const FlashSaleModel = model<
  IFlashSaleDocument,
  PaginateModel<IFlashSaleDocument>
>('flashSale', flashSaleSchema);

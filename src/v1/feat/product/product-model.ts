import { model, Schema, Types, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { IProductDocument } from './product-type';

const productSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true },
    totalUnit: { type: Number, required: true, default: 200 },
    startTime: { type: Date },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);

productSchema.plugin(paginate);

productSchema.index({ name: 1 });
productSchema.index({ isActive: 1 });

export const ProductModel = model<
  IProductDocument,
  PaginateModel<IProductDocument>
>('product', productSchema);

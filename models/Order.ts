import mongoose, { Schema, models, model } from 'mongoose';

const OrderSchema = new Schema(
  {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        title: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    total: { type: Number, required: true },
    customer: {
      name: String,
      email: String,
      address: String,
      city: String,
      country: String,
      postalCode: String,
    },
    status: { type: String, enum: ['pending', 'paid', 'shipped'], default: 'pending' },
  },
  { timestamps: true }
);

export default models.Order || model('Order', OrderSchema);

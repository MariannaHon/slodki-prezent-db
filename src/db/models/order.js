import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    items: [
      {
        name: String,
        quantity: Number,
        price: Number,
        discount: Number,
        photo: String,
      },
    ],
    totalAmount: Number,
    email: String,
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    stripeSessionId: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const OrdersCollection = model('orders', orderSchema);

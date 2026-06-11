import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    items: [
      {
        productId: String,
        name: String,
        quantity: Number,
        price: Number,
        discount: Number,
        photo: String,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    customer: {
      name: String,
      email: String,
      phone: String,
      address: String,
    },
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


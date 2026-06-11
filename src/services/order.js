import { OrdersCollection } from '../db/models/order.js';

export const createOrder = async (payload) => {
  const order = await OrdersCollection.create(payload);
  return order;
};

export const updateOrderBySessionId = async (sessionId, payload) => {
  const result = await OrdersCollection.findOneAndUpdate(
    { _id: sessionId },
    payload,
      {
        new: true,
        includeResultMetadata: true,
     }
    );
    if (!result || !result.value) return null;

    return {
        record: result.value,
        isNew: Boolean(result?.lastErrorObject?.upserted),
    };
};

export const getOrderBySessionId = async (sessionId) => {
  const order = await OrdersCollection.findOne({ _id: sessionId });
  return order;
};
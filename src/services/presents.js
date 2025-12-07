import { PresentsCollection } from '../db/models/presents.js';

export const getAllRecords = async () => {

    const records = await PresentsCollection.find();
    return records;
};

export const getRecordById = async (presentId) => {
    const present = await PresentsCollection.findById(presentId);
    return present;
};

export const createRecord = async (payload) => {
    const record = await PresentsCollection.create(payload);
    return record;
};

export const patchRecord = async (recordId, payload, options = {}) => {
    const rawResult = await PresentsCollection.findOneAndUpdate(
        { _id: recordId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        });

    if (!rawResult || !rawResult.value) return null;

    return {
        record: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

export const deletePresent = async (recordId) => {
    const record = await PresentsCollection.findOneAndDelete({ _id: recordId });
    return record;
};

export const patchPhoto = async (recordId, updateData) => {
  return PresentsCollection.findOneAndUpdate({ _id: recordId }, updateData, {
    new: true,
  });
};
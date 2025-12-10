import { BlogCollection } from '../db/models/blog.js';

export const getAllRecords = async () => {

    const records = await BlogCollection.find();
    return records;
};

export const getRecordById = async (recordId) => {
    const present = await BlogCollection.findById(recordId);
    return present;
};

export const createRecord = async (payload) => {
    const record = await BlogCollection.create(payload);
    return record;
};

export const patchRecord = async (recordId, payload, options = {}) => {
    const rawResult = await BlogCollection.findOneAndUpdate(
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

export const deleteBlog = async (recordId) => {
    const record = await BlogCollection.findOneAndDelete({ _id: recordId });
    return record;
};
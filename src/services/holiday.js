import { HolidayCollection } from '../db/models/holidays.js';

export const getAllRecords = async () => {

    const records = await HolidayCollection.find();
    return records;
};

export const createRecord = async (payload) => {
    const record = await HolidayCollection.create(payload);
    return record;
};

export const patchRecord = async (recordId, payload, options = {}) => {
    const rawResult = await HolidayCollection.findOneAndUpdate(
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

export const deleteHoliday = async (recordId) => {
    const record = await HolidayCollection.findOneAndDelete({ _id: recordId });
    return record;
};
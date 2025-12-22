import { PresentsCollection } from '../db/models/presents.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllRecords = async ({
  page = 1,
    perPage = 10,
    filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

    const presentsQuery = PresentsCollection.find();

  if (filter.dlaKogo) {
    presentsQuery.where('dlaKogo').equals(filter.dlaKogo);
  }

  if (filter.swieta) {
    presentsQuery.where('swieta').equals(filter.swieta);
  }

  if (filter.price) {
    if (filter.price.$gte) {
      presentsQuery.where('price').gte(filter.price.$gte);
    }
    if (filter.price.$lte) {
      presentsQuery.where('price').lte(filter.price.$lte);
    }
  }

  const [presentsCount, presents] = await Promise.all([
    PresentsCollection.find().merge(presentsQuery).countDocuments(),
    presentsQuery.skip(skip).limit(limit).exec(),
  ]);

  const paginationData = calculatePaginationData(presentsCount, perPage, page);

  return {
    data: presents,
    ...paginationData,
  };
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
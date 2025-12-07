import { getAllRecords, getRecordById, createRecord, patchRecord, deletePresent, patchPhoto } from "../services/presents.js";
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

import createHttpError from 'http-errors';

export const getPresentsController = async (req, res) => {

    const presents = await getAllRecords();
    res.json({
        status: 200,
        message: "Successfully found presents records!",
        data: presents,
    });
};

export const getRecordByIdController = async (req, res, next) => {
    const { recordId } = req.params;
    const record = await getRecordById(recordId);

    if (!record) {
        next(createHttpError(404, 'Present not found'));
        return;
    }

    res.json({
        status: 200,
        message: `Successfully found present with id ${recordId}!`,
        data: record,
    });
};

export const createPresentController = async (req, res) => {

    const presentData = { ...req.body};
    const present = await createRecord(presentData);

    res.status(201).json({
        status: 201,
        message: "Successfully created a record about present!",
        data: present,
    });
};

export const patchPresentController = async (req, res, next) => {
    const { recordId } = req.params;

    const result = await patchRecord(recordId, req.body);

    if (!result) {
        next(createHttpError(404, 'Record not found'));
        return;
    }

    res.json({
        status: 200,
        message: "Successfully patched a record!",
        data: result.record,
    });
};

export const deletePresentController = async (req, res, next) => {
    const { recordId } = req.params;
    const delPresent = await deletePresent(recordId);

    if (!delPresent) {
        next(createHttpError(404, 'Record not found'));
        return;
    }

    res.status(204).send();
};

export const patchPhotoController = async (req, res, next) => {
  const { recordId } = req.params;
  const img = req.file;

  if (!img) {
    return next(createHttpError(400, 'No image file uploaded'));
  }

  let photoUrl;

  if (env('ENABLE_CLOUDINARY') === 'true') {
    photoUrl = await saveFileToCloudinary(img);
  } else {
    photoUrl = await saveFileToUploadDir(img);
  }

  const result = await patchPhoto(recordId, { photo: photoUrl });

  if (!result) {
    return next(createHttpError(404, 'Present not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated product photo!',
    data: result,
  });
};

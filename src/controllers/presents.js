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
    
    const { photo, photo2, photo3, photo4 } = req.files || {};
    console.log('BODY:', req.body);
    console.log('FILES:', req.files);

  if (!photo && !photo2 && !photo3 && !photo4) {
    return next(createHttpError(400, 'No image file uploaded'));
  }

  const uploadedPhotos = {};

  const uploadHandler = async (file) => {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      return await saveFileToCloudinary(file);
    } else {
      return await saveFileToUploadDir(file);
    }
  };

  if (photo) uploadedPhotos.photo = await uploadHandler(photo[0]);
  if (photo2) uploadedPhotos.photo2 = await uploadHandler(photo2[0]);
  if (photo3) uploadedPhotos.photo3 = await uploadHandler(photo3[0]);
  if (photo4) uploadedPhotos.photo4 = await uploadHandler(photo4[0]);

  const result = await patchPhoto(recordId, uploadedPhotos);

  if (!result) {
    return next(createHttpError(404, 'Present not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated product photos!',
    data: result,
  });
};

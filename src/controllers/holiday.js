import { getAllRecords, createRecord, patchRecord, deleteHoliday, patchPhoto } from "../services/holiday.js";
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

import createHttpError from 'http-errors';

export const getHolidayController = async (req, res) => {

    const holidays = await getAllRecords();
    res.json({
        status: 200,
        message: "Successfully found holiday records!",
        data: holidays,
    });
};

export const createHolidayController = async (req, res) => {

    const holidayData = { ...req.body};
    const holiday = await createRecord(holidayData);

    res.status(201).json({
        status: 201,
        message: "Successfully created a record about holiday!",
        data: holiday,
    });
};

export const patchHolidayController = async (req, res, next) => {
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

export const deleteHolidayController = async (req, res, next) => {
    const { recordId } = req.params;
    const delPresent = await deleteHoliday(recordId);

    if (!delPresent) {
        next(createHttpError(404, 'Record not found'));
        return;
    }

    res.status(204).send();
};

export const patchPhotoController = async (req, res, next) => {
  try {
    const { recordId } = req.params;
    const file = req.file;

    if (!file) {
      return next(createHttpError(400, 'No image file uploaded'));
    }

    let photo;
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photo = await saveFileToCloudinary(file);
    } else {
      photo = await saveFileToUploadDir(file);
    }

    const result = await patchPhoto(recordId, { photo: photo });

    if (!result) {
      return next(createHttpError(404, 'Holiday not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a photo!',
      data: result,
    });
  } catch (error) {
      next(createHttpError(500, 'Something went wrong'));
      console.log(error);
  }
};


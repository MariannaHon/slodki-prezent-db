import { getAllRecords, createRecord, patchRecord, deleteHoliday } from "../services/holiday.js";
// import { env } from '../utils/env.js';
// import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
// import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

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
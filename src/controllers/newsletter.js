import { addNewsletter, getRecordByEmail, patchRecord, deleteNewsletter } from '../services/newsletter.js';

import createHttpError from 'http-errors';


export const addNewsletterController = async (req, res) => {

    const { email } = req.body;

    console.log(req.body);

    const existing = await getRecordByEmail(email);

    if (existing) {
        throw createHttpError(409, 'Email already subscribed');
    }

    const newsletter = await addNewsletter({ email });

    res.status(201).json({
        status: 201,
        message: "Successfully added email to newsletter!",
        data: newsletter,
    });
};


export const patchNewsletterController = async (req, res, next) => {
    const { newsletterId } = req.params;

    const result = await patchRecord(newsletterId, req.body);

    if (!result) {
        next(createHttpError(404, 'Record not found'));
        return;
    }

    res.json({
        status: 200,
        message: 'Successfully updated newsletter!',
        data: result.record,
    });
};

export const deleteNewsletterController = async (req, res, next) => {
    const { recordId } = req.params;

    const newsletter = await deleteNewsletter(recordId);

    if (!newsletter) {
        next(createHttpError(404, 'Record not found'));
        return;
    }

    res.status(204).send();
};

export const getNewsletterController = async (req, res, next) => {
    const { recordId } = req.params;

    const newsletter = await getRecordByEmail(recordId);

    if (!newsletter) {
        next(createHttpError(404, 'Record not found'));
        return;
    }

    res.json({
        status: 200,
        message: `Successfully found present with id ${recordId}!`,
        data: newsletter,
    });
};
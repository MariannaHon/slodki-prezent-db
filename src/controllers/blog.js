import { getAllRecords, getRecordById, createRecord, patchRecord, deleteBlog } from "../services/blog.js";
// import { env } from '../utils/env.js';
// import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
// import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

import createHttpError from 'http-errors';

export const getBlogController = async (req, res) => {

    const blog = await getAllRecords();
    res.json({
        status: 200,
        message: "Successfully found blog records!",
        data: blog,
    });
};

export const getRecordByIdController = async (req, res, next) => {
    const { recordId } = req.params;
    const record = await getRecordById(recordId);

    if (!record) {
        next(createHttpError(404, 'Article not found'));
        return;
    }

    res.json({
        status: 200,
        message: `Successfully found article with id ${recordId}!`,
        data: record,
    });
};

export const createBlogController = async (req, res) => {

    const blogData = { ...req.body};
    const blog = await createRecord(blogData);

    res.status(201).json({
        status: 201,
        message: "Successfully created an article!",
        data: blog,
    });
};

export const patchBlogController = async (req, res, next) => {
    const { recordId } = req.params;

    const result = await patchRecord(recordId, req.body);

    if (!result) {
        next(createHttpError(404, 'Article not found'));
        return;
    }

    res.json({
        status: 200,
        message: "Successfully patched a record!",
        data: result.record,
    });
};

export const deleteBlogController = async (req, res, next) => {
    const { recordId } = req.params;
    const delBlog = await deleteBlog(recordId);

    if (!delBlog) {
        next(createHttpError(404, 'Record not found'));
        return;
    }

    res.status(204).send();
};
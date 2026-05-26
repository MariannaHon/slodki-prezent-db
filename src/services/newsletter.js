import { NewsletterCollection } from "../db/models/newsletter.js";

export const addNewsletter = async (req, res) => {
    const { email } = req.body;
    const newsletter = await NewsletterCollection.create({ email });

    return newsletter;
};


export const getRecordByEmail = async (email) => {
    return NewsletterCollection.findOne({ email });
};

export const getRecordByEmail = async (email) => {
    const newsletter = await NewsletterCollection.findOne({ email });
    return newsletter;
};

export const patchRecord = async (recordId, payload, options = {}) => {
    const rawResult = await NewsletterCollection.findOneAndUpdate(
        { _id: recordId },
        payload,
        {   new: true,
            runValidators: true,
            ...options,
        }
    );  
    return rawResult;
};

export const deleteNewsletter = async (newsletterId) => {
    const delNewsletter = await NewsletterCollection.findByIdAndDelete(newsletterId);
    return delNewsletter;
};

import { NewsletterCollection } from "../db/models/newsletter.js";

export const addNewsletter = async ({ email }) => {
    const newsletter = await NewsletterCollection.create({ email });

    return newsletter;
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

    if (!rawResult || !rawResult.value) return null;

    return {
        record: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

export const deleteNewsletter = async (newsletterId) => {
    const delNewsletter = await NewsletterCollection.findByIdAndDelete(newsletterId);
    return delNewsletter;
};

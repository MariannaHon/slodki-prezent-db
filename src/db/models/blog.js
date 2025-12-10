import { Schema, model } from 'mongoose';

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    popular: {
        type: Boolean,
        required: true,
        default: false,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const BlogCollection = model('blog', blogSchema);

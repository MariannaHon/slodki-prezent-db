import { Schema, model } from 'mongoose';

const holidaySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const HolidayCollection = model('holiday', holidaySchema);

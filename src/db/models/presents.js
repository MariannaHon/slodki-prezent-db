import { Schema, model } from 'mongoose';

const presentsSchema = new Schema(
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
    contains: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: true, 
    },
    photo: {
      type: String,
      default: null,
    },
    photo2: {
      type: String,
      default: null,
    },
    photo3: {
      type: String,
      default: null,
    },
    photo4: {
      type: String,
      default: null,
    },
    new: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Boolean,
      default: false,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    dlaKogo: {
      type: [String],
      enum: ['child', 'firm', 'forHim', 'forHer'],
      required: true,
      trim: true,
    },
    swieta: {
      type: [String],
      enum: [
        'christmas',
        'womensDay',
        'menDay',
        'Halloween',
        'boxes',
        'mikolajki',
        'sylwester',
        'walentynki',
        'easter'
      ],
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export const PresentsCollection = model('presents', presentsSchema);
import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ['movie', 'tv'], required: true },
    year: Number,
    rating: String,
    duration: String,
    genre: [String],
    description: String,
    posterUrl: String,
    bannerUrl: String,
    filePath: String,
    fileSize: Number,
    featured: { type: Boolean, default: false },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Media', mediaSchema);
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Media from './models/Media.js';
import fs from 'fs';

dotenv.config();

// Map each title (must match exactly what's in MongoDB) to the actual file on disk
const fileMap = {
  'Dune': 'D:/CineVault/media/Dune.mp4',
  // add more entries here as you convert/link more files, e.g.:
  // 'The Matrix': 'D:/CineVault/media/matrix.mp4',
};

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  for (const [title, filePath] of Object.entries(fileMap)) {
    let fileSize = null;
    if (fs.existsSync(filePath)) {
      fileSize = fs.statSync(filePath).size;
    } else {
      console.warn(`⚠️  File not found on disk: ${filePath}`);
    }

    const result = await Media.findOneAndUpdate(
      { title },
      { filePath, fileSize },
      { new: true }
    );
    console.log(result ? `✅ Updated: ${title} (${(fileSize / 1e9).toFixed(2)} GB)` : `❌ Not found in DB: ${title}`);
  }

  await mongoose.disconnect();
}

run();
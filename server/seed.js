import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Media from './models/Media.js';

dotenv.config();

const seedData = [
  {
    title: 'The Matrix', type: 'movie', year: 1999, rating: '18+', duration: '2h 16m',
    genre: ['Action', 'Sci-Fi'],
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    posterUrl: '/posters/matrix.jpg', bannerUrl: '/banners/matrix.jpg', featured: true,
  },
  { title: 'Inception', type: 'movie', year: 2010, rating: '13+', posterUrl: '/posters/inception.jpg' },
  { title: 'Interstellar', type: 'movie', year: 2014, rating: '13+', posterUrl: '/posters/interstellar.jpg' },
  { title: 'Blade Runner 2049', type: 'movie', year: 2017, rating: '18+', posterUrl: '/posters/blade-runner.jpg' },
  { title: 'Dune', type: 'movie', year: 2021, rating: '13+', posterUrl: '/posters/dune.jpg' },
  { title: 'Arrival', type: 'movie', year: 2016, rating: '13+', posterUrl: '/posters/arrival.jpg' },
  { title: 'Stranger Things', type: 'tv', year: 2016, rating: '16+', posterUrl: '/posters/stranger-things.jpg' },
  { title: 'Dark', type: 'tv', year: 2017, rating: '16+', posterUrl: '/posters/dark.jpg' },
  { title: 'Severance', type: 'tv', year: 2022, rating: '16+', posterUrl: '/posters/severance.jpg' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Media.deleteMany({});
  await Media.insertMany(seedData);
  console.log('Seeded', seedData.length, 'items');
  await mongoose.disconnect();
}

seed();
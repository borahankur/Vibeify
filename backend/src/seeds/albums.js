import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);

		// Clear existing data
		await Album.deleteMany({});
		await Song.deleteMany({});

		// First, create all songs
		const createdSongs = await Song.insertMany([
			{
				title: "Believer",
				artist: "Imagine Dragons",
				imageUrl: "/cover-images/Evolve.jpeg",
				audioUrl: "/songs/Believer.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 204,
			},
			{
				title: "Whatever It Takes",
				artist: "Imagine Dragons",
				imageUrl: "/cover-images/Evolve.jpeg",
				audioUrl: "/songs/Whatever It Takes.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 201,
			},
			{
				title: "Thunder",
				artist: "Imagine Dragons",
				imageUrl: "/cover-images/Evolve.jpeg",
				audioUrl: "/songs/Thunder.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 187,
			},
			{
				title: "Better Now",
				artist: "Post Malone",
				imageUrl: "/cover-images/beerbongs & bentleys.jpeg",
				audioUrl: "/songs/Better Now.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 231,
			},
			{
				title: "Psycho (feat. Ty Dolla $ign)",
				artist: "Post Malone",
				imageUrl: "/cover-images/beerbongs & bentleys.jpeg",
				audioUrl: "/songs/Psycho (feat. Ty Dolla $ign),mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 221,
			},
			{
				title: "rockstar (feat. 21 Savage)",
				artist: "Post Malone",
				imageUrl: "/cover-images/beerbongs & bentleys.jpeg",
				audioUrl: "/songs/rockstar (feat. 21 Savage).mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 218,
			},
			{
				title: "Blinding Lights",
				artist: "The Weeknd",
				imageUrl: "/cover-images/After Hours.jpeg",
				audioUrl: "/songs/Blinding Lights.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 200,
			},
			{
				title: "Heartless",
				artist: "The Weeknd",
				imageUrl: "/cover-images/After Hours.jpeg",
				audioUrl: "/songs/Heartless.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 198,
			},
			{
				title: "Save Your Tears",
				artist: "The Weeknd",
				imageUrl: "/cover-images/After Hours.jpeg",
				audioUrl: "/songs/Save Your Tears.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 215,
			},
			{
				title: "Creepin' (with The Weeknd & 21 Savage)",
				artist: "Metro Boomin",
				imageUrl: "/cover-images/Heroes & Villains.jpeg",
				audioUrl: "/songs/Creepin' (with The Weeknd & 21 Savage).mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 221,
			},
			{
				title: "Superhero (Heroes & Villains) [with Future & Chris Brown]",
				artist: "Metro Boomin",
				imageUrl: "/cover-images/Heroes & Villains.jpeg",
				audioUrl: "/songs/Superhero (Heroes & Villains) [with Future & Chris Brown].mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 182,
			},
			{
				title: "Too Many Nights (feat. Don Toliver & with Future)",
				artist: "Metro Boomin",
				imageUrl: "/cover-images/Heroes & Villains.jpeg",
				audioUrl: "/songs/Too Many Nights (feat. Don Toliver & with Future).mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 199,
			},
			{
				title: "Don't Start Now",
				artist: "Dua Lipa",
				imageUrl: "/cover-images/Future Nostalgia.jpeg",
				audioUrl: "/songs/Don't Start Now.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 183,
			},
			{
				title: "Levitating (feat. DaBaby)",
				artist: "Dua Lipa",
				imageUrl: "/cover-images/Future Nostalgia.jpeg",
				audioUrl: "/songs/Levitating (feat. DaBaby).mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 203,
			},
			{
				title: "Physical",
				artist: "Dua Lipa",
				imageUrl: "/cover-images/Future Nostalgia.jpeg",
				audioUrl: "/songs/Physical.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 193,
			},
			{
				title: "drivers license",
				artist: "Olivia Rodrigo",
				imageUrl: "/cover-images/SOUR.jpeg",
				audioUrl: "/songs/drivers license.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 242,
			},
			{
				title: "good 4 u",
				artist: "Olivia Rodrigo",
				imageUrl: "/cover-images/SOUR.jpeg",
				audioUrl: "/songs/good 4 u.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 178,
			}
		]);
		// Create albums with references to song IDs
		const albums = [
			{
				title: "Evolve",
				artist: "Imagine Dragons",
				imageUrl: "/albums/Evolve.jpeg",
				releaseYear: 2017,
				songs: createdSongs.slice(0,3).map((song) => song._id),
			},
			{
				title: "beerbongs & bentleys",
				artist: "Post Malone",
				imageUrl: "/albums/beerbongs & bentleys.jpeg",
				releaseYear: 2018,
				songs: createdSongs.slice(3,6).map((song) => song._id),
			},{
				title: "After Hours",
				artist: "The Weeknd",
				imageUrl: "/albums/After Hours.jpeg",
				releaseYear: 2020,
				songs: createdSongs.slice(6,9).map((song) => song._id),
			},{
				title: "Heroes & Villains",
				artist: "Metro Boomin",
				imageUrl: "/albums/Heroes & Villains.jpeg",
				releaseYear: 2022,
				songs: createdSongs.slice(9,12).map((song) => song._id),
			},{
				title: "Future Nostalgia",
				artist: "Dua Lipa",
				imageUrl: "/albums/Future Nostalgia.jpeg",
				releaseYear: 2021,
				songs: createdSongs.slice(12,15).map((song) => song._id),
			},{
				title: "SOUR",
				artist: "Olivia Rodrigo",
				imageUrl: "/albums/SOUR.jpeg",
				releaseYear: 2021,
				songs: createdSongs.slice(15,17).map((song) => song._id),
			}
		];

		// Insert all albums
		const createdAlbums = await Album.insertMany(albums);

		// Update songs with their album references
		for (let i = 0; i < createdAlbums.length; i++) {
			const album = createdAlbums[i];
			const albumSongs = albums[i].songs;
			await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
		}

		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDatabase();

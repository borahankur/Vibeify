import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from 'dotenv'

config()

const songs = [
	{
		title: "Believer",
		artist: "Imagine Dragons",
		imageUrl: "/cover-images/Evolve.jpeg",
		audioUrl: "/songs/Believer.mp3",
		duration: 204,
	},
	{
		title: "Whatever It Takes",
		artist: "Imagine Dragons",
		imageUrl: "/cover-images/Evolve.jpeg",
		audioUrl: "/songs/Whatever It Takes.mp3",
		duration: 201,
	},
	{
		title: "Thunder",
		artist: "Imagine Dragons",
		imageUrl: "/cover-images/Evolve.jpeg",
		audioUrl: "/songs/Thunder.mp3",
		duration: 187,
	},
	{
		title: "Better Now",
		artist: "Post Malone",
		imageUrl: "/cover-images/beerbongs & bentleys.jpeg",
		audioUrl: "/songs/Better Now.mp3",
		duration: 231,
	},
	{
		title: "Psycho (feat. Ty Dolla $ign)",
		artist: "Post Malone",
		imageUrl: "/cover-images/beerbongs & bentleys.jpeg",
		audioUrl: "/songs/Psycho (feat. Ty Dolla $ign),mp3",
		duration: 221,
	},
	{
		title: "rockstar (feat. 21 Savage)",
		artist: "Post Malone",
		imageUrl: "/cover-images/beerbongs & bentleys.jpeg",
		audioUrl: "/songs/rockstar (feat. 21 Savage).mp3",
		duration: 218,
	},
	{
		title: "Blinding Lights",
		artist: "The Weeknd",
		imageUrl: "/cover-images/After Hours.jpeg",
		audioUrl: "/songs/Blinding Lights.mp3",
		duration: 200,
	},
	{
		title: "Heartless",
		artist: "The Weeknd",
		imageUrl: "/cover-images/After Hours.jpeg",
		audioUrl: "/songs/Heartless.mp3",
		duration: 198,
	},
	{
		title: "Save Your Tears",
		artist: "The Weeknd",
		imageUrl: "/cover-images/After Hours.jpeg",
		audioUrl: "/songs/Save Your Tears.mp3",
		duration: 215,
	},
	{
		title: "Creepin' (with The Weeknd & 21 Savage)",
		artist: "Metro Boomin",
		imageUrl: "/cover-images/Heroes & Villains.jpeg",
		audioUrl: "/songs/Creepin' (with The Weeknd & 21 Savage).mp3",
		duration: 221,
	},
	{
		title: "Superhero (Heroes & Villains) [with Future & Chris Brown]",
		artist: "Metro Boomin",
		imageUrl: "/cover-images/Heroes & Villains.jpeg",
		audioUrl: "/songs/Superhero (Heroes & Villains) [with Future & Chris Brown].mp3",
		duration: 182,
	},
	{
		title: "Too Many Nights (feat. Don Toliver & with Future)",
		artist: "Metro Boomin",
		imageUrl: "/cover-images/Heroes & Villains.jpeg",
		audioUrl: "/songs/Too Many Nights (feat. Don Toliver & with Future).mp3",
		duration: 199,
	},
	{
		title: "Don't Start Now",
		artist: "Dua Lipa",
		imageUrl: "/cover-images/Future Nostalgia.jpeg",
		audioUrl: "/songs/Don't Start Now.mp3",
		duration: 183,
	},
	{
		title: "Levitating (feat. DaBaby)",
		artist: "Dua Lipa",
		imageUrl: "/cover-images/Future Nostalgia.jpeg",
		audioUrl: "/songs/Levitating (feat. DaBaby).mp3",
		duration: 203,
	},
	{
		title: "Physical",
		artist: "Dua Lipa",
		imageUrl: "/cover-images/Future Nostalgia.jpeg",
		audioUrl: "/songs/Physical.mp3",
		duration: 193,
	},
	{
		title: "drivers license",
		artist: "Olivia Rodrigo",
		imageUrl: "/cover-images/SOUR.jpeg",
		audioUrl: "/songs/drivers license.mp3",
		duration: 242,
	},
	{
		title: "good 4 u",
		artist: "Olivia Rodrigo",
		imageUrl: "/cover-images/SOUR.jpeg",
		audioUrl: "/songs/good 4 u.mp3",
		duration: 178,
	},
	{
		title: 'Sweet but Psycho',
		artist: 'Ava Max',
		imageUrl: '/cover-images/Sweet but Psycho.jpeg',
		audioUrl: '/songs/Sweet but Psycho.mp3',
		duration: 187,
	}
];

const seedSongs = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		// Clear existing songs
		await Song.deleteMany({});
		// Insert new songs
		await Song.insertMany(songs);
		console.log("Songs seeded successfully!");
	} catch (error) {
		console.error("Error seeding songs:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedSongs();

import { ImageSourcePropType } from "react-native";

export type Card = {
  id: number;
  title: string;
  image: string;
};

export const CARD_DATA: Card[] = [
  {
    id: 0,
    title: "Mountain Adventure",
    image: "https://picsum.photos/seed/mountain/800/600",
  },
  {
    id: 1,
    title: "Ocean Waves",
    image: "https://picsum.photos/seed/ocean/800/600",
  },
  {
    id: 2,
    title: "Forest Trail",
    image: "https://picsum.photos/seed/forest/800/600",
  },
  {
    id: 3,
    title: "City Lights",
    image: "https://picsum.photos/seed/city/800/600",
  },
  {
    id: 4,
    title: "Desert Sunset",
    image: "https://picsum.photos/seed/desert/800/600",
  },
];

export type Album = {
  id: number;
  title: string;
  artist: string;
  genre: string;
  year: number;
  tracks: number;
  duration: string;
  image: ImageSourcePropType;
};

export const ALBUMS_DATA: Album[] = [
  {
    id: 1,
    title: "Faded Portraits",
    artist: "Grey Matter",
    genre: "Indie",
    year: 2023,
    tracks: 9,
    duration: "36 min",
    image: require("@/assets/albums/image_1.png"),
  },
  {
    id: 2,
    title: "Saturday Party",
    artist: "Neon Skyline",
    genre: "EDM",
    year: 2024,
    tracks: 12,
    duration: "48 min",
    image: require("@/assets/albums/image_2.png"),
  },
  {
    id: 3,
    title: "Lantern",
    artist: "Virtual Concert",
    genre: "R&B",
    year: 2023,
    tracks: 12,
    duration: "42 min",
    image: require("@/assets/albums/image_3.png"),
  },
  {
    id: 4,
    title: "Club Nine",
    artist: "DJ Ricko & DJ Amil",
    genre: "Electronic",
    year: 2024,
    tracks: 14,
    duration: "55 min",
    image: require("@/assets/albums/image_4.png"),
  },
  {
    id: 5,
    title: "Urban Night",
    artist: "DJ Reisa & DJ Merc",
    genre: "Hip-Hop",
    year: 2024,
    tracks: 10,
    duration: "38 min",
    image: require("@/assets/albums/image_5.png"),
  },
  {
    id: 6,
    title: "Dia dos Namorados",
    artist: "Luna & Sol",
    genre: "Latin Pop",
    year: 2023,
    tracks: 11,
    duration: "40 min",
    image: require("@/assets/albums/image_6.png"),
  },
  {
    id: 7,
    title: "Spicy Sunday",
    artist: "Tokyo",
    genre: "J-Pop",
    year: 2024,
    tracks: 8,
    duration: "32 min",
    image: require("@/assets/albums/image_7.png"),
  },
  {
    id: 8,
    title: "Music Explore",
    artist: "JH Dam",
    genre: "Electro Pop",
    year: 2025,
    tracks: 10,
    duration: "37 min",
    image: require("@/assets/albums/image_8.png"),
  },
  {
    id: 9,
    title: "Summer Tour",
    artist: "Joan & Eternal",
    genre: "Indie Pop",
    year: 2024,
    tracks: 13,
    duration: "46 min",
    image: require("@/assets/albums/image_9.png"),
  },
  {
    id: 10,
    title: "Unknown Friend",
    artist: "S3 Brand",
    genre: "Alternative",
    year: 2025,
    tracks: 9,
    duration: "34 min",
    image: require("@/assets/albums/image_10.png"),
  },
];

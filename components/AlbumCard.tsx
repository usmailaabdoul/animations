import { Album } from "@/lib/constants";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

const ALBUM_CARD_WIDTH = 160;
const ALBUM_IMAGE_HEIGHT = 160;

const AlbumCard = ({ album }: { album: Album }) => {
  return (
    <View style={styles.albumCard}>
      <Image
        source={album.image}
        style={styles.albumImage}
        contentFit="cover"
      />
      <View style={styles.albumInfo}>
        <Text style={styles.albumTitle} numberOfLines={1}>
          {album.title}
        </Text>
        <Text style={styles.albumArtist} numberOfLines={1}>
          {album.artist}
        </Text>
        <Text style={styles.albumMeta}>
          {album.genre} · {album.year}
        </Text>
      </View>
    </View>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({
  albumCard: {
    width: ALBUM_CARD_WIDTH,
  },
  albumImage: {
    width: ALBUM_CARD_WIDTH,
    height: ALBUM_IMAGE_HEIGHT,
  },
  albumInfo: {
    paddingTop: 8,
  },
  albumTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  albumArtist: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  albumMeta: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
});

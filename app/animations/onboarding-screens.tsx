import AlbumCard from "@/components/AlbumCard";
import OnboardingCard, {
  CARD_HEIGHT,
  CARD_WIDTH,
} from "@/components/OnboardingCard";
import { ALBUMS_DATA } from "@/lib/constants";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const width = Dimensions.get("window").width;

const OnboardingScreens = () => {
  const scrollX = useSharedValue(0);
  const [searchQuery, setSearchQuery] = useState("");

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Feather
            name="search"
            size={18}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search..."
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>
      </View>
      <Animated.ScrollView
        horizontal
        style={{
          height: CARD_HEIGHT + 60,
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: (width - CARD_WIDTH) / 2,
          justifyContent: "center",
          alignItems: "center",
        }}
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={onScroll}
      >
        {ALBUMS_DATA.map((card, index) => (
          <OnboardingCard
            key={card.id}
            index={index}
            image={card.image}
            title={card.title}
            scrollX={scrollX}
          />
        ))}
      </Animated.ScrollView>
      <View style={styles.albumSection}>
        <Text style={styles.albumSectionTitle}>Popular Albums</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.albumListContent}
        >
          {[...ALBUMS_DATA].reverse().map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default OnboardingScreens;

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 9999,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  albumSection: {
    paddingTop: 10,
  },
  albumSectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  albumListContent: {
    paddingHorizontal: 16,
    gap: 14,
  },
});

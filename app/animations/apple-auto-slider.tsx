import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRef } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 60;
const CARD_MARGIN = 10;

type Card = {
  id: string;
  title: string;
  image: string;
};

const cards: Card[] = [
  {
    id: "1",
    title: "Mountain Adventure",
    image: "https://picsum.photos/seed/mountain/800/600",
  },
  {
    id: "2",
    title: "Ocean Waves",
    image: "https://picsum.photos/seed/ocean/800/600",
  },
  {
    id: "3",
    title: "Forest Trail",
    image: "https://picsum.photos/seed/forest/800/600",
  },
  {
    id: "4",
    title: "City Lights",
    image: "https://picsum.photos/seed/city/800/600",
  },
  {
    id: "5",
    title: "Desert Sunset",
    image: "https://picsum.photos/seed/desert/800/600",
  },
];

export default function AppleAutoSlider() {
  const activeIndex = useSharedValue<number>(0);
  const isPaused = useSharedValue<boolean>(false);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        activeIndex.value = viewableItems[0].index;
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const togglePause = () => {
    // isPaused.value = !isPaused.value;
    console.log("before", activeIndex.value);
    activeIndex.value = activeIndex.value + 1;
    console.log("after", activeIndex.value);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: activeIndex.value,
        animated: true,
      });
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!isPaused.value) {
  //       activeIndex.value = (activeIndex.value + 1) % cards.length;
  //       if (flatListRef.current) {
  //         flatListRef.current.scrollToIndex({
  //           index: activeIndex.value,
  //           animated: true,
  //         });
  //       }
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [isPaused, activeIndex]);

  const paginationDotStyle = useAnimatedStyle(() => ({
    width: interpolate(
      activeIndex.value,
      [activeIndex.value - 1, activeIndex.value, activeIndex.value + 1],
      [8, 24, 8],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={cards}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => (
          <Animated.View style={[styles.card]}>
            <Image
              source={{ uri: item.image }}
              style={styles.cardImage}
              contentFit="cover"
              transition={300}
            />
            <View style={styles.cardOverlay}>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
          </Animated.View>
        )}
      />

      <View style={styles.controlsContainer}>
        <View style={styles.pagination}>
          {cards.map((_, index) => (
            <Animated.View
              key={index}
              style={[styles.paginationDot, paginationDotStyle]}
            />
          ))}
        </View>

        <Pressable onPress={togglePause} style={styles.pauseButton}>
          <Ionicons
            name={isPaused.value ? "play" : "pause"}
            size={20}
            color="#333"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: 480,
    marginHorizontal: CARD_MARGIN,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    gap: 16,
  },
  pagination: {
    flexDirection: "row",
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
  },
  paginationDotActive: {
    backgroundColor: "#333",
    width: 24,
  },
  pauseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
});

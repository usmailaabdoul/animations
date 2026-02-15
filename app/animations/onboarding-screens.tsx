import { ALBUMS_DATA } from "@/lib/constants";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import {
  Dimensions,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const width = Dimensions.get("window").width;
const CARD_HEIGHT = width - 150;
const CARD_WIDTH = width - 150;

const OnboardingScreens = () => {
  const scrollX = useSharedValue(0);
  const [searchQuery, setSearchQuery] = useState("");

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
          height: 0,
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
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: "blue" }}>
        <Text>Hello</Text>
      </ScrollView>
    </View>
  );
};

export default OnboardingScreens;

const OnboardingCard = ({
  image,
  title,
  scrollX,
  index,
}: {
  index: number;
  image: ImageSourcePropType;
  title: string;
  scrollX: SharedValue<number>;
}) => {
  const cardStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    // Create subtle arc motion
    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [50, 0, 50], // Arc upward when centered
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.6, 1, 0.6],
      Extrapolation.CLAMP,
    );

    const rotateZ = interpolate(
      scrollX.value,
      inputRange,
      [15, 0, -15],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ translateY }, { scale }, { rotateZ: `${rotateZ}deg` }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          alignSelf: "center",
        },
        cardStyle,
      ]}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={image}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
      </View>
    </Animated.View>
  );
};

// OnboardingCard.displayName = "OnboardingCard";

// const AnimatedOnboardingCard = Animated.createAnimatedComponent(OnboardingCard);

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
});

import { CARD_DATA } from "@/lib/constants";
import { Image } from "expo-image";
import { Dimensions, Text, View } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const width = Dimensions.get("window").width;
const CARD_HEIGHT = (width * 1564) / 1274;
const CARD_WIDTH = width - 100;

const OnboardingScreens = () => {
  const scrollX = useSharedValue(0);

  // const handleScroll = useAnimatedScrollHandler((event: ScrollEvent) => {
  //   scrollX.value = event.contentOffset.x / CARD_WIDTH;
  // });

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: (width - CARD_WIDTH) / 2,
          // flex: 1,
          justifyContent: "center",
          alignItems: "center",
          // gap: 10,
        }}
        // style={{ flex: 1, backgroundColor: "red" }}
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        // snapToAlignment="start"
        // pagingEnabled
        scrollEventThrottle={16}
        onScroll={onScroll}
      >
        {CARD_DATA.map((card, index) => (
          <OnboardingCard
            key={card.id}
            index={index}
            {...card}
            scrollX={scrollX}
          />
        ))}
      </Animated.ScrollView>
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
  image: string;
  title: string;
  scrollX: SharedValue<number>;
}) => {
  const cardStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [width / 2, 0, -width / 2],
    );

    const scale = interpolate(
      scrollX.value,
      [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH],
      [0.8, 1, 0.8],
    );
    const height = interpolate(
      scrollX.value,
      [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH],
      [CARD_HEIGHT * 0.7, CARD_HEIGHT, CARD_HEIGHT * 0.7],
    );

    return {
      transform: [{ scale }],
      height,
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: CARD_WIDTH,
          // height: CARD_HEIGHT,
          alignSelf: "center",
        },
        cardStyle,
      ]}
    >
      <View
        style={{
          // padding: 20,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: image }}
          style={{ borderRadius: 20, width: "100%", height: "100%" }}
          contentFit="cover"
        />
        <Text>{title}</Text>
      </View>
    </Animated.View>
  );
};

// OnboardingCard.displayName = "OnboardingCard";

// const AnimatedOnboardingCard = Animated.createAnimatedComponent(OnboardingCard);

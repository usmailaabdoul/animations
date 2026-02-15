import { Image } from "expo-image";
import { Dimensions, ImageSourcePropType, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const width = Dimensions.get("window").width;
export const CARD_HEIGHT = width - 125;
export const CARD_WIDTH = width - 125;

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

    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [50, 0, 50],
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

export default OnboardingCard;

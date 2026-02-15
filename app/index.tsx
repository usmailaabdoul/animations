import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type Animation = {
  id: string;
  title: string;
  description: string;
  route: "/animations/apple-auto-slider" | "/animations/onboarding-screens"; // Add more routes as union types when you add more animations
};

const animations: Animation[] = [
  {
    id: "1",
    title: "Apple Auto Slider",
    description: "Auto-scrolling section slider inspired by Apple's design",
    route: "/animations/apple-auto-slider",
  },
  {
    id: "2",
    title: "Onboarding Screens",
    description: "Onboarding screens with smooth animations and transitions",
    route: "/animations/onboarding-screens",
  },
  // Add more animations here as you learn
];

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>React Native Animations</Text>
      <Text style={styles.subtitle}>Tap on any animation to explore</Text>

      <FlatList
        data={animations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Link href={item.route} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 24,
  },
  list: {
    paddingHorizontal: 20,
    gap: 16,
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
});

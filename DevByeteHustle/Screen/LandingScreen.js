import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

// Slide data
const slides = [
  {
    id: "1",
    title: "Hustle Smarter, Not Harder",
    subtitle: "Find jobs, chat, and grow your career.",
    image: require("../assets/icon.png"),
  },
  {
    id: "2",
    title: "Connect with Employers",
    subtitle: "Direct access to job opportunities that match your skills.",
    image: require("../assets/upwork-illustration.jpg"),
  },
  {
    id: "3",
    title: "Secure Payments & Easy Contracts",
    subtitle: "Work confidently with protected transactions.",
    image: require("../assets/images3.png"),
  },
];

const LandingScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  return (
    <View style={styles.container}>
      {/* Slideshow */}
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ alignItems: "center" }} // Centers slides properly
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        )}
      />

      {/* Pagination Indicator */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
        ))}
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Auth")}>
        <Text style={styles.signupText}>New to DevBytes Hustlers? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: height * 0.1,
    marginBottom: height * 0.05,
    color: "#000",
  },
  slide: {
    width, // Full screen width for proper alignment
    height: height * 0.5, // Fixed height to prevent shaking
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  image: {
    width: 250,
    height: 180,
    resizeMode: "contain",
    marginBottom: height * 0.03,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
    marginBottom: height * 0.04,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: height * 0.04,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "gray",
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#3498db",
  },
  loginButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    width: "90%",
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 10,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  signupText: {
    color: "#3498db",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: height * 0.05,
  },
});

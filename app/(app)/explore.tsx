import React from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TravelCard } from "~/components/ui/travel-card";

// Mock data
const MOCK_ITINERARIES = [
  {
    id: "1",
    title: "Week in Kyoto",
    description: "Traditional temples, tea ceremonies, and hidden gardens - the perfect cultural experience",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    username: "japan_expert",
    profileImage: "https://ui-avatars.com/api/?name=japan_expert",
  },
  {
    id: "2",
    title: "Paris Romance",
    description: "3 days of romantic spots, local cafes, and evening walks along the Seine",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    username: "paris_wanderer",
    profileImage: "https://ui-avatars.com/api/?name=paris_wanderer",
  },
  {
    id: "3",
    title: "Iceland Adventure",
    description: "5-day road trip through waterfalls, hot springs, and volcanic landscapes",
    imageUrl: "https://images.unsplash.com/photo-1476610182048-b716b8518aae",
    username: "nordic_explorer",
    profileImage: "https://ui-avatars.com/api/?name=nordic_explorer",
  },
  {
    id: "4",
    title: "Thai Island Hopping",
    description: "2 weeks exploring the best beaches and hidden gems of Thailand's islands",
    imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
    username: "beach_lover",
    profileImage: "https://ui-avatars.com/api/?name=beach_lover",
  },
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 20) / 2; // Account for padding and gap

  // Group itineraries into pairs for rows
  const rows = MOCK_ITINERARIES.reduce<Array<typeof MOCK_ITINERARIES>>((acc, item, index) => {
    const rowIndex = Math.floor(index / 2);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(item);
    return acc;
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-zinc-100"
      contentContainerStyle={{
        paddingBottom: insets.bottom + 80,
      }}
    >
      <View className="px-2 pt-2">
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row justify-between mb-2">
            {row.map((itinerary) => (
              <View key={itinerary.id} style={{ width: cardWidth }}>
                <TravelCard
                  title={itinerary.title}
                  description={itinerary.description}
                  imageUrl={itinerary.imageUrl}
                  username={itinerary.username}
                  profileImage={itinerary.profileImage}
                  onPress={() => console.log(`Selected itinerary: ${itinerary.id}`)}
                />
              </View>
            ))}
            {/* Add empty view if row has only one item */}
            {row.length === 1 && <View style={{ width: cardWidth }} />}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

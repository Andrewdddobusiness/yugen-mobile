import React from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ItineraryCard } from "~/components/ui/itinerary-card";

// Mock data
const MOCK_MY_ITINERARIES = [
  {
    id: "1",
    title: "Summer in Santorini",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
    username: "your_username",
    profileImage: "https://ui-avatars.com/api/?name=your_username",
    startDate: "Jul 15, 2024",
    endDate: "Jul 22, 2024",
  },
  {
    id: "2",
    title: "New York City Adventure",
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
    username: "your_username",
    profileImage: "https://ui-avatars.com/api/?name=your_username",
    startDate: "Aug 5, 2024",
    endDate: "Aug 10, 2024",
  },
  {
    id: "3",
    title: "Swiss Alps Hiking",
    imageUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99",
    username: "your_username",
    profileImage: "https://ui-avatars.com/api/?name=your_username",
    startDate: "Sep 1, 2024",
    endDate: "Sep 7, 2024",
  },
  {
    id: "4",
    title: "Tokyo Food Tour",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
    username: "your_username",
    profileImage: "https://ui-avatars.com/api/?name=your_username",
    startDate: "Oct 12, 2024",
    endDate: "Oct 18, 2024",
  },
];

export default function ItinerariesScreen() {
  const insets = useSafeAreaInsets();

  const handleOptionsPress = (id: string) => {
    console.log(`Options pressed for itinerary: ${id}`);
    // Here you can implement a menu or action sheet
  };

  return (
    <ScrollView
      className="flex-1 bg-zinc-100"
      contentContainerStyle={{
        paddingBottom: insets.bottom + 80,
      }}
    >
      <View className="p-2 gap-y-2">
        {MOCK_MY_ITINERARIES.map((itinerary) => (
          <ItineraryCard
            key={itinerary.id}
            title={itinerary.title}
            imageUrl={itinerary.imageUrl}
            username={itinerary.username}
            profileImage={itinerary.profileImage}
            startDate={itinerary.startDate}
            endDate={itinerary.endDate}
            onPress={() => console.log(`Selected itinerary: ${itinerary.id}`)}
            onOptionsPress={() => handleOptionsPress(itinerary.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

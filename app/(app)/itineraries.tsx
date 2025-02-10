import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";

export default function ItinerariesScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-2xl font-bold">My Itineraries</Text>
        <Text className="text-muted-foreground mt-2">View and manage your travel plans</Text>
      </View>
    </ScrollView>
  );
}

import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";

export default function ExploreScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-2xl font-bold">Explore</Text>
        <Text className="text-muted-foreground mt-2">Discover and browse through premade travel itineraries</Text>
      </View>
    </ScrollView>
  );
}

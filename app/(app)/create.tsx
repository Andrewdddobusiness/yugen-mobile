import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";

export default function CreateScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-2xl font-bold">Create New Itinerary</Text>
        <Text className="text-muted-foreground mt-2">Start planning your next adventure</Text>

        <Button className="mt-4" variant="default">
          <Text className="text-primary-foreground font-medium">Create New Itinerary</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

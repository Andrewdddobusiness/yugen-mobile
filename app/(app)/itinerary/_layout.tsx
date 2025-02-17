import { Stack } from "expo-router";

export default function ItineraryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          title: "Itinerary Details",
        }}
      />
    </Stack>
  );
}

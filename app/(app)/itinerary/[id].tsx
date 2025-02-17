import React, { useEffect } from "react";
import { View, ScrollView, Pressable, Image } from "react-native";
import { useLocalSearchParams, Stack, useNavigation } from "expo-router";
import { Text } from "~/components/ui/text";
import { ChevronDown, ArrowUpDown } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "~/lib/supabase";
import { useHeaderTitleStore } from "@/stores/headerTitleStore";

// Mock data
const MOCK_ITINERARY = {
  id: "1",
  title: "Summer in Europe",
  places: [
    {
      id: "1",
      name: "Eiffel Tower",
      date: "2024-07-15",
      type: "Attraction",
      imageUrl: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e",
    },
    {
      id: "2",
      name: "Louvre Museum",
      date: "2024-07-15",
      type: "Museum",
      imageUrl: "https://images.unsplash.com/photo-1544413660-299165566b1d",
    },
    {
      id: "3",
      name: "Notre-Dame Cathedral",
      date: null,
      type: "Attraction",
      imageUrl: "https://images.unsplash.com/photo-1584721285723-75d43008d0d3",
    },
    // Add more mock places...
  ],
};

type DateGroup = {
  date: string | null;
  places: typeof MOCK_ITINERARY.places;
};

export default function ItineraryDetailsScreen() {
  const { id } = useLocalSearchParams();
  const setTitle = useHeaderTitleStore((state: any) => state.setTitle);
  const resetTitle = useHeaderTitleStore((state: any) => state.resetTitle);
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = React.useState<"overview" | "calendar">("overview");
  const [sortAscending, setSortAscending] = React.useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setTitle("");

    async function getItineraryTitle() {
      const { data, error } = await supabase
        .from("itinerary")
        .select(
          `
          itinerary_destination!inner (
            city,
            order_number
          )
        `
        )
        .eq("itinerary_id", id)
        .single();

      if (data && !error) {
        const destinations = data.itinerary_destination
          .sort((a: any, b: any) => a.order_number - b.order_number)
          .map((d: any) => d.city);
        setTitle(destinations.join(" → "));
      }
    }

    if (id) {
      getItineraryTitle();
    }

    // Reset title when navigating away
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      resetTitle();
    });

    return unsubscribe;
  }, [id, setTitle]);

  // Group places by date
  const groupedPlaces = React.useMemo(() => {
    const groups: Record<string, typeof MOCK_ITINERARY.places> = {
      unassigned: [],
    };

    MOCK_ITINERARY.places.forEach((place) => {
      if (!place.date) {
        groups.unassigned.push(place);
      } else {
        if (!groups[place.date]) {
          groups[place.date] = [];
        }
        groups[place.date].push(place);
      }
    });

    // Convert to array and sort
    const sortedGroups: DateGroup[] = Object.entries(groups)
      .map(([date, places]) => ({
        date: date === "unassigned" ? null : date,
        places,
      }))
      .sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return sortAscending
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      });

    return sortedGroups;
  }, [sortAscending]);

  return (
    <>
      <Stack.Screen
        options={{
          title: MOCK_ITINERARY.title,
          headerShown: false,
        }}
      />
      <View className="flex-1 bg-background">
        {/* Tabs */}
        <View className="flex-row border-b border-border">
          <Pressable
            className={`flex-1 py-3 ${activeTab === "overview" ? "border-b-2 border-primary" : ""}`}
            onPress={() => setActiveTab("overview")}
          >
            <Text className="text-center font-medium">Overview</Text>
          </Pressable>
          <Pressable
            className={`flex-1 py-3 ${activeTab === "calendar" ? "border-b-2 border-primary" : ""}`}
            onPress={() => setActiveTab("calendar")}
          >
            <Text className="text-center font-medium">Calendar</Text>
          </Pressable>
        </View>

        {activeTab === "overview" ? (
          <>
            {/* Controls */}
            <View className="flex-row justify-between items-center p-4 border-b border-border">
              <Pressable className="flex-row items-center gap-x-2" onPress={() => setSortAscending(!sortAscending)}>
                <ArrowUpDown size={20} />
                <Text>{sortAscending ? "Oldest First" : "Newest First"}</Text>
              </Pressable>

              <Pressable className="flex-row items-center gap-x-2">
                <Text>Jump to Date</Text>
                <ChevronDown size={20} />
              </Pressable>
            </View>

            {/* Places List */}
            <ScrollView
              className="flex-1"
              contentContainerStyle={{
                paddingBottom: insets.bottom,
              }}
            >
              {groupedPlaces.map((group) => (
                <View key={group.date || "unassigned"} className="p-4">
                  <Text className="text-lg font-semibold mb-2">
                    {group.date ? new Date(group.date).toLocaleDateString() : "Unassigned"}
                  </Text>
                  <View className="gap-y-2">
                    {group.places.map((place) => (
                      <PlaceCard key={place.id} place={place} />
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>
          </>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-muted-foreground">Calendar view coming soon...</Text>
          </View>
        )}
      </View>
    </>
  );
}

function PlaceCard({ place }: { place: (typeof MOCK_ITINERARY.places)[0] }) {
  return (
    <View className="flex-row items-center p-3 bg-card rounded-lg">
      <View className="w-16 h-16 rounded-md bg-muted overflow-hidden">
        <Image source={{ uri: place.imageUrl }} className="w-full h-full" />
      </View>
      <View className="flex-1 ml-3">
        <Text className="font-medium">{place.name}</Text>
        <Text className="text-sm text-muted-foreground">{place.type}</Text>
      </View>
    </View>
  );
}

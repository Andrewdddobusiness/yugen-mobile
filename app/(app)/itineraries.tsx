import React from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ItineraryCard } from "~/components/ui/itinerary-card";
import { getUserItineraries } from "~/lib/services/itinerary";
import { useSession } from "~/lib/auth/ctx";
import type { Itinerary } from "~/types/itinerary";

export default function ItinerariesScreen() {
  const insets = useSafeAreaInsets();
  const { session } = useSession();
  const [itineraries, setItineraries] = React.useState<Itinerary[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadItineraries() {
      try {
        if (session?.user?.id) {
          const data = await getUserItineraries(session.user.id);
          setItineraries(data);
        }
      } catch (error) {
        console.error("Failed to load itineraries:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadItineraries();
  }, [session?.user?.id]);

  const handleOptionsPress = (id: number) => {
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
        {itineraries.map((itinerary) => (
          <ItineraryCard
            key={itinerary.itinerary_id}
            title={itinerary.title || "Untitled Itinerary"}
            imageUrl={itinerary.imageUrl || "https://placekitten.com/200/200"}
            username={session?.user?.email || ""}
            profileImage={`https://ui-avatars.com/api/?name=${session?.user?.email}`}
            startDate={itinerary.startDate || "TBD"}
            endDate={itinerary.endDate || "TBD"}
            onPress={() => console.log(`Selected itinerary: ${itinerary.itinerary_id}`)}
            onOptionsPress={() => handleOptionsPress(itinerary.itinerary_id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

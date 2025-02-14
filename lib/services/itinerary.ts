import { supabase } from "~/lib/supabase";
import type { Itinerary } from "~/types/itinerary";
import { getCityImage } from "./storage";

export async function getUserItineraries(userId: string): Promise<Itinerary[]> {
  const { data: itineraries, error } = await supabase
    .from("itinerary")
    .select(
      `
      itinerary_id,
      itinerary_destination!inner (
        city,
        country,
        from_date,
        to_date,
        order_number
      )
    `
    )
    .eq("user_id", userId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  // Process the data to match our UI needs
  const processedItineraries = await Promise.all(
    itineraries.map(async (itinerary) => {
      const destinations = itinerary.itinerary_destination.sort((a, b) => a.order_number - b.order_number);

      // Get the first destination's city image
      const firstDestination = destinations[0];
      let imageUrl = null;
      console.log("firstDestination", firstDestination);
      if (firstDestination) {
        imageUrl = await getCityImage(firstDestination.country, firstDestination.city);
      }
      console.log("imageUrl", imageUrl);

      return {
        itinerary_id: itinerary.itinerary_id,
        title: destinations.map((d) => d.city).join(" → "),
        imageUrl: imageUrl,
        startDate: destinations[0]?.from_date,
        endDate: destinations[destinations.length - 1]?.to_date,
        destinations,
      };
    })
  );

  return processedItineraries;
}

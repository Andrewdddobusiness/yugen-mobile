import React from "react";
import { View, Image, Pressable } from "react-native";
import { Text } from "./text";
import { MoreHorizontal } from "lucide-react-native";
import { formatDateRange } from "~/lib/utils/formatDate";
import { Skeleton } from "./skeleton";

interface ItineraryCardProps {
  title: string;
  imageUrl: string | null;
  username: string;
  profileImage: string;
  startDate: string;
  endDate: string;
  onPress?: () => void;
  onOptionsPress?: () => void;
}

export function ItineraryCard({
  title,
  imageUrl,
  username,
  profileImage,
  startDate,
  endDate,
  onPress,
  onOptionsPress,
}: ItineraryCardProps) {
  const dateRange = formatDateRange(startDate, endDate);
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <Pressable onPress={onPress}>
      <View className="bg-white p-3 rounded-lg flex-row">
        {/* Image or Skeleton */}
        {imageUrl ? (
          <>
            {isImageLoading && <Skeleton className="absolute w-24 h-24 rounded-lg" />}
            <Image
              source={{ uri: imageUrl }}
              className="w-24 h-24 rounded-lg"
              resizeMode="cover"
              onLoadStart={() => setIsImageLoading(true)}
              onLoadEnd={() => setIsImageLoading(false)}
            />
          </>
        ) : (
          <Skeleton className="w-24 h-24 rounded-lg" />
        )}

        {/* Content */}
        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 gap-y-2">
              <Text className="font-semibold text-base" numberOfLines={1}>
                {title}
              </Text>

              {/* User info and dates */}
              <View className="flex-row items-center gap-2">
                <Image source={{ uri: profileImage }} className="w-5 h-5 rounded-full" />
                <Text className="text-xs text-muted-foreground">{dateRange}</Text>
              </View>
            </View>

            <Pressable onPress={onOptionsPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <MoreHorizontal size={20} color="#64748b" />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

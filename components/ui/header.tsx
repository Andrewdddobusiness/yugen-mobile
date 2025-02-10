import React from "react";
import { View } from "react-native";
import { Text } from "./text";
import { Search, Bell } from "lucide-react-native";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
  title: string;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
}

export function Header({ title, onSearchPress, onNotificationPress }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="bg-background " style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-4 py-3">
        {/* Left space for symmetry */}
        <View className="w-12" />

        {/* Title */}
        <Text className="text-lg font-semibold">{title}</Text>

        {/* Right actions */}
        <View className="flex-row items-center gap-4">
          <Pressable onPress={onSearchPress}>
            <Search size={24} color="#64748b" />
          </Pressable>
          <Pressable onPress={onNotificationPress}>
            <Bell size={24} color="#64748b" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

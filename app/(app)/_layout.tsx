import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text } from "react-native";
import { Redirect } from "expo-router";
import { useSession } from "~/lib/auth/ctx";
import { Home, Compass, PlusCircle, Map, User } from "lucide-react-native";
import { Header } from "~/components/ui/header";
import { useHeaderTitleStore } from "@/stores/headerTitleStore";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme();
  const title = useHeaderTitleStore((state: any) => state.title);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/signIn" />;
  }

  const handleSearch = () => {
    console.log("Search pressed");
  };

  const handleNotification = () => {
    console.log("Notification pressed");
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: ({ route }) => {
          const getTitleForRoute = () => {
            if (route.name.startsWith("itinerary")) {
              return title || "";
            }

            switch (route.name) {
              case "index":
                return "Home";
              case "explore":
                return "Explore";
              case "create":
                return "Create";
              case "itineraries":
                return "My Itineraries";
              case "profile":
                return "Profile";
              default:
                return "";
            }
          };

          return (
            <Header title={getTitleForRoute()} onSearchPress={handleSearch} onNotificationPress={handleNotification} />
          );
        },
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarShowLabel: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => <Compass size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => <PlusCircle size={size + 8} color={color} style={{ marginBottom: -3 }} />,
        }}
      />
      <Tabs.Screen
        name="itineraries"
        options={{
          title: "My Itineraries",
          tabBarIcon: ({ color, size }) => <Map size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="itinerary"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

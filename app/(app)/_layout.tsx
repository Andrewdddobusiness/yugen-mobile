import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text } from "react-native";
import { Redirect } from "expo-router";
import { useSession } from "~/lib/auth/ctx";
import { Home, Compass, PlusCircle, Map, User } from "lucide-react-native";
import { Header } from "~/components/ui/header";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme();

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
          // Get the title based on the route
          const getTitleForRoute = () => {
            switch (route.name) {
              case "index":
                return "Home";
              case "explore":
                return "Explore";
              case "create":
                return "Create";
              case "itineraries":
                return "My Plans";
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
            // Use a transparent background on iOS to show the blur effect
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
          title: "My Plans",
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
    </Tabs>
  );
}

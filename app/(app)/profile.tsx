import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { useSession } from "~/lib/auth/ctx";

export default function ProfileScreen() {
  const { signOut } = useSession();

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-2xl font-bold">Profile</Text>
        <Text className="text-muted-foreground mt-2">Manage your account and settings</Text>

        <Button className="mt-4" variant="destructive" onPress={signOut}>
          <Text className="text-destructive-foreground font-medium">Sign Out</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

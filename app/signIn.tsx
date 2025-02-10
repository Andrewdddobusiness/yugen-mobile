import React from "react";
import { View } from "react-native";
import { Link, router } from "expo-router";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useSession } from "~/lib/auth/ctx";

export default function SignInScreen() {
  const { signIn } = useSession();

  return (
    <View className="flex-1 justify-center p-4 bg-background">
      <View className="gap-y-6">
        <View className="gap-y-2">
          <Text className="text-2xl font-bold text-foreground text-center">Welcome Back</Text>
          <Text className="text-muted-foreground text-center">Sign in to your account</Text>
        </View>

        <View className="gap-y-4">
          <Input placeholder="Email" autoCapitalize="none" keyboardType="email-address" />
          <Input placeholder="Password" secureTextEntry />

          <Button
            variant="default"
            className="w-full"
            onPress={() => {
              signIn();
              router.replace("/(app)");
            }}
          >
            <Text className="text-primary-foreground font-medium">Sign In</Text>
          </Button>

          <View className="flex-row justify-center space-x-1">
            <Text className="text-muted-foreground">Don't have an account? </Text>
            <Link href="/signUp">
              <Text className="text-primary font-medium">Sign Up</Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}

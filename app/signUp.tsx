import React from "react";
import { View } from "react-native";
import { Link, router } from "expo-router";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useSession } from "~/lib/auth/ctx";

export default function SignUpScreen() {
  const { signUp } = useSession();

  return (
    <View className="flex-1 justify-center p-4 bg-background">
      <View className="gap-y-6">
        <View className="gap-y-2">
          <Text className="text-2xl font-bold text-foreground text-center">Create Account</Text>
          <Text className="text-muted-foreground text-center">Sign up for a new account</Text>
        </View>

        <View className="gap-y-4">
          <Input placeholder="Name" autoCapitalize="words" />
          <Input placeholder="Email" autoCapitalize="none" keyboardType="email-address" />
          <Input placeholder="Password" secureTextEntry />

          <Button
            variant="default"
            className="w-full"
            onPress={() => {
              signUp();
              router.replace("/(app)");
            }}
          >
            <Text className="text-primary-foreground font-medium">Sign Up</Text>
          </Button>

          <View className="flex-row justify-center gap-x-1">
            <Text className="text-muted-foreground">Already have an account?</Text>
            <Link href="/signIn">
              <Text className="text-primary font-medium">Sign In</Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}

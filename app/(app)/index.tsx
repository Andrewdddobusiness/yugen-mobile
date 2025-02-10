import React from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Post } from "~/components/ui/post";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Mock data
const MOCK_POSTS = [
  {
    id: "1",
    username: "traveler_jane",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    title: "Amazing Trip to Bali",
    description: "Spent 2 weeks exploring the beautiful beaches and temples of Bali. Here's my complete itinerary!",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    likes: 124,
    comments: 23,
  },
  {
    id: "2",
    username: "wanderlust_mike",
    profileImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
    title: "Tokyo Food Guide",
    description: "A curated list of must-try restaurants and street food spots in Tokyo. Save this for your next trip!",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
    likes: 89,
    comments: 15,
  },
  {
    id: "3",
    username: "adventure_sam",
    profileImage: "https://ui-avatars.com/api/?name=adventure_sam",
    title: "Backpacking Europe",
    description: "My 3-month journey through 10 European countries. Budget tips and highlights included!",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    likes: 256,
    comments: 45,
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = React.useState(false);
  const [posts, setPosts] = React.useState(MOCK_POSTS);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)));
  };

  const handleComment = (postId: string, comment: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, comments: post.comments + 1 } : post)));
    // Here you would typically send the comment to your backend
    console.log(`New comment on post ${postId}:`, comment);
  };

  const handleShare = (postId: string) => {
    // Implement share functionality
    console.log(`Sharing post ${postId}`);
  };

  return (
    <ScrollView
      className="flex-1 bg-zinc-100"
      contentContainerStyle={{
        paddingBottom: insets.bottom + 80,
      }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View className="pt-2">
        {posts.map((post) => (
          <View key={post.id} className="mt-4">
            <Post
              username={post.username}
              profileImage={post.profileImage}
              title={post.title}
              description={post.description}
              imageUrl={post.imageUrl}
              likes={post.likes}
              comments={post.comments}
              onLike={() => handleLike(post.id)}
              onComment={(text) => handleComment(post.id, text)}
              onShare={() => handleShare(post.id)}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

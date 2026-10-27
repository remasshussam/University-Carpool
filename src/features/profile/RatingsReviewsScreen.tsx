import { useMemo, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { getReviews, getAverageRating, getInitials } from "./profileApi";

type Props = NativeStackScreenProps<RootStackParamList, "RatingsReviews">;
type Filter = "All" | 5 | 4 | 3;
const FILTERS: Filter[] = ["All", 5, 4, 3];

function Stars({ rating, size }: { rating: number; size: number }) {
  return (
    <View className="flex-row">
      {[1, 2, 3, 4, 5].map((n) => (
        <Ionicons key={n} name={n <= Math.round(rating) ? "star" : "star-outline"} size={size} color="#F5B301" />
      ))}
    </View>
  );
}

export default function RatingsReviewsScreen({ navigation }: Props) {
  const reviews = getReviews();
  const average = getAverageRating();
  const [filter, setFilter] = useState<Filter>("All");

  const filteredReviews = useMemo(
    () => (filter === "All" ? reviews : reviews.filter((review) => review.stars === filter)),
    [reviews, filter]
  );

  const header = (
    <View>
      <View className="bg-white rounded-3xl p-5 items-center mb-3">
        <Text className="text-5xl font-bold text-gray-900">{average.toFixed(1)}</Text>
        <View className="mt-2">
          <Stars rating={average} size={22} />
        </View>
        <Text className="text-sm text-gray-500 mt-2">{reviews.length} reviews</Text>
      </View>

      <View className="flex-row mb-3">
        {FILTERS.map((item) => (
          <Pressable
            key={String(item)}
            onPress={() => setFilter(item)}
            className={`px-4 py-2 rounded-full mr-2 ${filter === item ? "bg-primary" : "bg-white"}`}
          >
            <Text className={filter === item ? "text-white font-semibold" : "text-gray-600"}>
              {item === "All" ? "All" : `${item} ★`}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text className="text-xs text-gray-400 mb-2">Tap a review to see that person's profile.</Text>
    </View>
  );

  return (
    <FlatList
      data={filteredReviews}
      keyExtractor={(review) => review.id}
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <View className="items-center mt-8">
          <Ionicons name="chatbubble-ellipses-outline" size={44} color="#9CA3AF" />
          <Text className="text-gray-500 mt-2">No reviews with this rating</Text>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          className="bg-white rounded-2xl p-4 mb-3 active:opacity-70"
          onPress={() => navigation.navigate("PublicProfile", { userId: item.fromId })}
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
              <Text className="text-sm font-bold text-navy">{getInitials(item.from)}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-gray-900">{item.from}</Text>
              <Text className="text-xs text-gray-400">{item.date}</Text>
            </View>
            <Stars rating={item.stars} size={14} />
          </View>

          {item.tags.length > 0 ? (
            <View className="flex-row flex-wrap mt-3">
              {item.tags.map((tag) => (
                <View key={tag} className="bg-green-50 px-2 py-1 rounded-full mr-2 mb-1">
                  <Text className="text-xs text-green-700">{tag}</Text>
                </View>
              ))}
            </View>
          ) : null}

          <Text className="text-sm text-gray-700 mt-2">{item.comment}</Text>
        </Pressable>
      )}
    />
  );
}
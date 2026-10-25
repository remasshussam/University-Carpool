import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";
import AppButton from "@/components/AppButton";
import { getPublicUser, getInitials } from "./profileApi";

type Props = NativeStackScreenProps<RootStackParamList, "PublicProfile">;

function Stars({ rating, size }: { rating: number; size: number }) {
  return (
    <View className="flex-row">
      {[1, 2, 3, 4, 5].map((n) => (
        <Ionicons key={n} name={n <= Math.round(rating) ? "star" : "star-outline"} size={size} color="#F5B301" />
      ))}
    </View>
  );
}

export default function PublicProfileScreen({ navigation, route }: Props) {
  const person = getPublicUser(route.params.userId);

  if (!person) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Ionicons name="person-outline" size={56} color="#9CA3AF" />
        <Text className="text-base text-gray-600 mt-3 mb-6">User not found.</Text>
        <AppButton title="Go Back" variant="outline" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const average = person.reviews.length
    ? person.reviews.reduce((sum, review) => sum + review.stars, 0) / person.reviews.length
    : 0;

  return (
    <ScrollView contentContainerClassName="p-4 pb-8">
      <View className="bg-white rounded-3xl p-5 items-center">
        <View className="w-20 h-20 rounded-full bg-navy items-center justify-center">
          <Text className="text-white text-2xl font-bold">{getInitials(person.name)}</Text>
        </View>
        <Text className="text-2xl font-bold text-gray-900 mt-3">{person.name}</Text>
        <Text className="text-sm text-gray-500 mt-1">{person.faculty}</Text>
        <View className="bg-green-100 px-3 py-1 rounded-full mt-3">
          <Text className="text-xs font-semibold text-green-700">{person.role}</Text>
        </View>
        <Text className="text-xs text-gray-400 mt-2">Member since {person.memberSince}</Text>
      </View>

      <View className="flex-row mt-3">
        <View className="flex-1 bg-white rounded-2xl py-4 items-center mr-2">
          <View className="flex-row items-center">
            <Ionicons name="star" size={16} color="#F5B301" />
            <Text className="text-xl font-bold text-navy ml-1">{average.toFixed(1)}</Text>
          </View>
          <Text className="text-xs text-gray-500 mt-1">Rating</Text>
        </View>
        <View className="flex-1 bg-white rounded-2xl py-4 items-center">
          <Text className="text-xl font-bold text-navy">{person.ridesCount}</Text>
          <Text className="text-xs text-gray-500 mt-1">Rides</Text>
        </View>
      </View>

      <Text className="text-xs font-semibold text-gray-500 uppercase mt-5 mb-2 ml-1">
        Reviews ({person.reviews.length})
      </Text>

      {person.reviews.length === 0 ? (
        <View className="bg-white rounded-2xl p-6 items-center">
          <Ionicons name="chatbubble-ellipses-outline" size={40} color="#9CA3AF" />
          <Text className="text-gray-500 mt-2">No reviews yet</Text>
        </View>
      ) : (
        person.reviews.map((review) => (
          <View key={review.id} className="bg-white rounded-2xl p-4 mb-3">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
                <Text className="text-sm font-bold text-navy">{getInitials(review.from)}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900">{review.from}</Text>
                <Text className="text-xs text-gray-400">{review.date}</Text>
              </View>
              <Stars rating={review.stars} size={14} />
            </View>
            <Text className="text-sm text-gray-700 mt-2">{review.comment}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
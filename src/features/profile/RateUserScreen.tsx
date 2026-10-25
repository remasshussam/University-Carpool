import { useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";
import AppButton from "@/components/AppButton";
import { getRideById, rateRide, getInitials } from "./profileApi";

type Props = NativeStackScreenProps<RootStackParamList, "RateUser">;

const LABELS = ["Tap a star to rate", "Poor", "Fair", "Good", "Very good", "Excellent"];
const TAGS = ["On time", "Friendly", "Safe", "Clean car", "Polite"];
const COMMENT_MAX = 200;

export default function RateUserScreen({ navigation, route }: Props) {
  const { rideId } = route.params;
  const ride = getRideById(rideId);
  const [stars, setStars] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  if (!ride || ride.rated) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Ionicons name="alert-circle-outline" size={56} color="#9CA3AF" />
        <Text className="text-base text-gray-600 text-center mt-3 mb-6">
          {ride ? "You already rated this ride." : "Ride not found."}
        </Text>
        <AppButton title="Go Back" variant="outline" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  function toggleTag(tag: string) {
    setTags(tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]);
  }

  function handleSubmit() {
    if (stars === 0) {
      setError("Please choose from 1 to 5 stars");
      return;
    }
    rateRide(rideId);
    Alert.alert("Thanks for your feedback!", `You rated this ride ${stars} out of 5.`, [
      { text: "Done", onPress: () => navigation.goBack() },
    ]);
  }

  return (
    <ScrollView contentContainerClassName="p-4 pb-8" keyboardShouldPersistTaps="handled">
      <View className="bg-white rounded-3xl p-5 items-center">
        <View className="w-16 h-16 rounded-full bg-navy items-center justify-center">
          <Text className="text-white text-xl font-bold">{getInitials(ride.otherUser)}</Text>
        </View>
        <Text className="text-lg font-bold text-gray-900 mt-3">{ride.otherUser}</Text>
        <Text className="text-sm text-gray-500 mt-1">
          {ride.from} → {ride.to} · {ride.date}
        </Text>

        <Text className="text-base text-gray-700 mt-5 mb-3">How was your ride?</Text>
        <View className="flex-row">
          {[1, 2, 3, 4, 5].map((n) => (
            <Pressable
              key={n}
              onPress={() => {
                setStars(n);
                setError("");
              }}
              className="mx-1"
            >
              <Ionicons name={n <= stars ? "star" : "star-outline"} size={40} color="#F5B301" />
            </Pressable>
          ))}
        </View>
        <Text className={`text-sm font-semibold mt-2 ${stars ? "text-gray-900" : "text-gray-400"}`}>{LABELS[stars]}</Text>
      </View>

      <View className="bg-white rounded-2xl p-4 mt-3">
        <Text className="text-sm font-semibold text-gray-900 mb-3">What went well?</Text>
        <View className="flex-row flex-wrap">
          {TAGS.map((tag) => (
            <Pressable
              key={tag}
              onPress={() => toggleTag(tag)}
              className={`px-3 py-2 rounded-full mr-2 mb-2 ${tags.includes(tag) ? "bg-primary" : "bg-gray-100"}`}
            >
              <Text className={tags.includes(tag) ? "text-sm text-white font-semibold" : "text-sm text-gray-700"}>{tag}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="bg-white rounded-2xl p-4 mt-3">
        <Text className="text-sm font-semibold text-gray-900 mb-2">Write a review (optional)</Text>
        <TextInput
          className="border border-gray-200 rounded-xl p-3 text-base text-gray-900 min-h-[100px]"
          placeholder="Tell others about your ride..."
          placeholderTextColor="#9CA3AF"
          value={comment}
          onChangeText={setComment}
          maxLength={COMMENT_MAX}
          multiline
          textAlignVertical="top"
        />
        <Text className="text-xs text-gray-400 text-right mt-1">
          {comment.length}/{COMMENT_MAX}
        </Text>
      </View>

      {error ? <Text className="text-red-600 text-center mt-3">{error}</Text> : null}

      <View className="mt-4">
        <AppButton title="Submit Rating" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}
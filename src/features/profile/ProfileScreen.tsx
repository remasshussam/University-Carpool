import { useCallback, useState, ComponentProps } from "react";
import { View, Text, ScrollView, Pressable, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { getUser, getRides, getAverageRating, getInitials } from "./profileApi";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

type MenuItem = {
  icon: ComponentProps<typeof Ionicons>["name"];
  label: string;
  subtitle: string;
  screen: "EditProfile" | "RideHistory" | "RatingsReviews" | "Settings";
  color: string;
  box: string;
};

const MENU: MenuItem[] = [
  { icon: "create-outline", label: "Edit Profile", subtitle: "Update your details", screen: "EditProfile", color: "#2563EB", box: "bg-blue-50" },
  { icon: "time-outline", label: "Ride History", subtitle: "Your past rides", screen: "RideHistory", color: "#1A9A4A", box: "bg-green-50" },
  { icon: "star-outline", label: "Ratings & Reviews", subtitle: "What others say about you", screen: "RatingsReviews", color: "#F5B301", box: "bg-yellow-50" },
  { icon: "settings-outline", label: "Settings", subtitle: "Notifications and password", screen: "Settings", color: "#0B3C4D", box: "bg-gray-100" },
];

export default function ProfileScreen({ navigation }: Props) {
  const [user, setUser] = useState(getUser());
  const [rides, setRides] = useState(getRides());
  const [showLogout, setShowLogout] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setUser(getUser());
      setRides(getRides());
    }, [])
  );

  const ridesTaken = rides.filter((ride) => ride.role === "Rider" && ride.status === "Completed").length;
  const ridesOffered = rides.filter((ride) => ride.role === "Driver" && ride.status === "Completed").length;

  function confirmLogout() {
    setShowLogout(false);
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  }

  return (
    <ScrollView contentContainerClassName="p-4 pb-8">
      <View className="bg-white rounded-3xl p-5 items-center">
        <View className="w-20 h-20 rounded-full bg-navy items-center justify-center">
          <Text className="text-white text-2xl font-bold">{getInitials(user.name)}</Text>
        </View>
        <Text className="text-2xl font-bold text-gray-900 mt-3">{user.name}</Text>
        <Text className="text-sm text-gray-500 mt-1">{user.faculty || "Add your faculty in Edit Profile"}</Text>
        <View className="bg-green-100 px-3 py-1 rounded-full mt-3">
          <Text className="text-xs font-semibold text-green-700">{user.role}</Text>
        </View>
        <Text className="text-xs text-gray-400 mt-2">Member since {user.memberSince}</Text>
      </View>

      <View className="flex-row mt-3">
        <View className="flex-1 bg-white rounded-2xl py-4 items-center mr-2">
          <View className="flex-row items-center">
            <Ionicons name="star" size={16} color="#F5B301" />
            <Text className="text-xl font-bold text-navy ml-1">{getAverageRating().toFixed(1)}</Text>
          </View>
          <Text className="text-xs text-gray-500 mt-1">Rating</Text>
        </View>
        {user.role !== "Driver" ? (
          <View className="flex-1 bg-white rounded-2xl py-4 items-center mr-2">
            <Text className="text-xl font-bold text-navy">{ridesTaken}</Text>
            <Text className="text-xs text-gray-500 mt-1">Rides taken</Text>
          </View>
        ) : null}
        {user.role !== "Rider" ? (
          <View className="flex-1 bg-white rounded-2xl py-4 items-center">
            <Text className="text-xl font-bold text-navy">{ridesOffered}</Text>
            <Text className="text-xs text-gray-500 mt-1">Rides offered</Text>
          </View>
        ) : null}
      </View>

      {user.bio ? (
        <View className="bg-white rounded-2xl p-4 mt-3">
          <Text className="text-sm font-semibold text-gray-900 mb-1">About me</Text>
          <Text className="text-sm text-gray-600">{user.bio}</Text>
        </View>
      ) : null}

      <View className="bg-white rounded-2xl mt-3 px-4">
        {MENU.map((item, index) => (
          <Pressable
            key={item.screen}
            className={`flex-row items-center py-4 active:opacity-70 ${index < MENU.length - 1 ? "border-b border-gray-100" : ""}`}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View className={`w-10 h-10 rounded-xl items-center justify-center ${item.box}`}>
              <Ionicons name={item.icon} size={20} color={item.color} />
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-base font-semibold text-gray-900">{item.label}</Text>
              <Text className="text-xs text-gray-500">{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </Pressable>
        ))}
      </View>

      <View className="bg-white rounded-2xl mt-3 p-4">
        <Text className="text-sm font-semibold text-gray-900 mb-3">Contact</Text>
        <View className="flex-row items-center mb-3">
          <Ionicons name="mail-outline" size={18} color="#0B3C4D" />
          <Text className="text-sm text-gray-700 ml-3">{user.email}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="call-outline" size={18} color="#0B3C4D" />
          <Text className="text-sm text-gray-700 ml-3">{user.phone}</Text>
        </View>
      </View>

      <Pressable
        className="flex-row items-center justify-center bg-white rounded-2xl p-4 mt-3 border border-red-100 active:opacity-70"
        onPress={() => setShowLogout(true)}
      >
        <Ionicons name="log-out-outline" size={20} color="#E53935" />
        <Text className="text-base font-semibold text-red-600 ml-2">Log out</Text>
      </Pressable>

      <Modal visible={showLogout} transparent animationType="fade" onRequestClose={() => setShowLogout(false)}>
        <View className="flex-1 bg-black/40 items-center justify-center px-8">
          <View className="bg-white rounded-3xl px-6 py-7 w-full items-center">
            <View className="w-14 h-14 rounded-full bg-red-500 items-center justify-center mb-4">
              <Ionicons name="log-out" size={28} color="#FFFFFF" />
            </View>
            <Text className="text-lg font-bold text-navy text-center">Log Out?</Text>
            <Text className="text-sm text-gray-500 text-center mt-2">
              You will need to sign in again to use Uni Carpool.
            </Text>

            <View className="flex-row w-full mt-6">
              <Pressable
                className="flex-1 bg-gray-100 rounded-2xl py-3 items-center mr-2 active:opacity-70"
                onPress={() => setShowLogout(false)}
              >
                <Text className="text-base font-semibold text-gray-700">Stay</Text>
              </Pressable>
              <Pressable className="flex-1 bg-red-500 rounded-2xl py-3 items-center active:opacity-70" onPress={confirmLogout}>
                <Text className="text-base font-semibold text-white">Log Out</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
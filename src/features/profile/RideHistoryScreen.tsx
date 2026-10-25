import { useCallback, useMemo, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";
import RideCard from "@/components/RideCard";
import { getRides, getUser, HistoryRide } from "./profileApi";

type Props = NativeStackScreenProps<RootStackParamList, "RideHistory">;
type Filter = "All" | "Rider" | "Driver";

const FILTERS: Filter[] = ["All", "Rider", "Driver"];

export default function RideHistoryScreen({ navigation }: Props) {
  const [rides, setRides] = useState(getRides());
  const [filter, setFilter] = useState<Filter>("All");
  const isBoth = getUser().role === "Rider & Driver";

  useFocusEffect(
    useCallback(() => {
      setRides(getRides());
    }, [])
  );

  const shown = isBoth ? filter : getUser().role;

  const filteredRides = useMemo(
    () => (shown === "All" ? rides : rides.filter((ride) => ride.role === shown)),
    [rides, shown]
  );

  const completed = rides.filter((ride) => ride.status === "Completed").length;
  const canceled = rides.filter((ride) => ride.status === "Canceled").length;

  function openRide(ride: HistoryRide) {
    if (ride.status === "Completed" && !ride.rated) {
      navigation.navigate("RateUser", { rideId: ride.id });
    }
  }

  const header = (
    <View>
      <View className="flex-row bg-white rounded-2xl p-4 mb-3">
        <View className="flex-1 items-center">
          <Text className="text-2xl font-bold text-navy">{rides.length}</Text>
          <Text className="text-xs text-gray-500">Total</Text>
        </View>
        <View className="flex-1 items-center border-l border-r border-gray-100">
          <Text className="text-2xl font-bold text-green-700">{completed}</Text>
          <Text className="text-xs text-gray-500">Completed</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-2xl font-bold text-red-600">{canceled}</Text>
          <Text className="text-xs text-gray-500">Canceled</Text>
        </View>
      </View>

      {isBoth ? (
        <View className="flex-row mb-3">
          {FILTERS.map((name) => (
            <Pressable
              key={name}
              onPress={() => setFilter(name)}
              className={`px-4 py-2 rounded-full mr-2 ${filter === name ? "bg-primary" : "bg-white"}`}
            >
              <Text className={filter === name ? "text-white font-semibold" : "text-gray-600"}>{name}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      <Text className="text-xs text-gray-400 mb-2">Tap a completed ride to rate it.</Text>
    </View>
  );

  return (
    <FlatList
      data={filteredRides}
      keyExtractor={(ride) => ride.id}
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <View className="items-center mt-10">
          <Ionicons name="car-outline" size={48} color="#9CA3AF" />
          <Text className="text-gray-500 mt-2">No rides to show</Text>
        </View>
      }
      renderItem={({ item }) => (
        <RideCard
          from={item.from}
          to={item.to}
          date={item.date}
          time={item.time}
          status={item.status}
          info={`As ${item.role} · ${item.fare} EGP`}
          action={item.status === "Completed" && !item.rated ? "Rate ›" : item.rated ? "Rated ✓" : undefined}
          onPress={() => openRide(item)}
        />
      )}
    />
  );
}
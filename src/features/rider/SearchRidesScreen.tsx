import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { rides } from "./riderData";

type Props = {
  onRidePress: (rideId: number) => void;
};

export default function SearchRidesScreen({ onRidePress }: Props) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("all");

  const query = search.trim().toLowerCase();

  const results = rides
    .filter(
      (r) =>
        r.from.toLowerCase().includes(query) ||
        r.to.toLowerCase().includes(query) ||
        r.driver.toLowerCase().includes(query),
    )
    .sort((a, b) =>
      sortBy === "cheapest"
        ? a.price - b.price
        : sortBy === "top"
          ? b.rating - a.rating
          : 0,
    );

  return (
    <SafeAreaView className="flex-1 bg-[#F5F8FC]" edges={["top"]}>
      <View className="bg-[#071E3B] px-5 py-5">
        <Text className="text-xl font-bold text-white">Search Rides</Text>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="mx-4 mt-5 flex-row items-center rounded-xl border border-gray-200 bg-white px-4">
          <Ionicons name="search-outline" size={22} color="#64748B" />

          <TextInput
            className="h-14 flex-1 px-3 text-base text-[#071E3B]"
            placeholder="Search by location or driver..."
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
          />

          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={21} color="#94A3B8" />
            </Pressable>
          )}
        </View>

        <View className="mt-5 flex-row items-center gap-2 px-4">
          {[
            { id: "all", label: "All Rides" },
            { id: "top", label: "Top Rated" },
            { id: "cheapest", label: "Cheapest" },
          ].map((item) => (
            <Pressable
              key={item.id}
              onPress={() => setSortBy(item.id)}
              className={`flex-row items-center rounded-full px-3 py-3 ${
                sortBy === item.id ? "bg-[#00A878]" : "bg-white"
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  sortBy === item.id ? "text-white" : "text-[#64748B]"
                }`}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="px-4 pb-8 pt-6">
          <Text className="mb-4 text-lg font-bold text-[#071E3B]">
            Available Rides ({results.length})
          </Text>

          {results.length === 0 ? (
            <View className="items-center rounded-2xl bg-white p-8">
              <Ionicons name="search-outline" size={42} color="#94A3B8" />
              <Text className="mt-3 font-semibold text-[#071E3B]">
                No rides found
              </Text>
              <Text className="mt-1 text-center text-sm text-gray-500">
                Try searching for another location.
              </Text>
            </View>
          ) : (
            results.map((ride) => (
              <Pressable
                key={ride.id}
                onPress={() => onRidePress(ride.id)}
                style={({ pressed }) => ({
                  transform: [{ scale: pressed ? 1.02 : 1 }],
                  opacity: pressed ? 0.95 : 1,
                })}
                className="mb-3 rounded-2xl bg-white p-4"
              >
                <View className="flex-row items-center">
                  <View className="h-12 w-12 items-center justify-center rounded-full bg-[#E8F5FF]">
                    <Ionicons name="person" size={23} color="#07558C" />
                  </View>

                  <View className="ml-3 flex-1">
                    <Text className="font-bold text-[#071E3B]">
                      {ride.driver}
                    </Text>
                    <Text className="mt-1 text-xs text-gray-500">
                      <Ionicons name="star" size={13} color="#F59E0B" />{" "}
                      {ride.rating}
                    </Text>
                  </View>

                  <View className="h-9 w-9 items-center justify-center rounded-full bg-[#E6F7F0]">
                    <Ionicons name="arrow-forward" size={19} color="#00A878" />
                  </View>
                </View>

                <View className="mt-4 flex-row items-center">
                  <Ionicons name="location-outline" size={17} color="#00A878" />
                  <Text className="ml-2 flex-1 text-sm text-[#071E3B]">
                    {ride.from} → {ride.to}
                  </Text>
                </View>

                <View className="mt-3 flex-row items-center justify-between">
                  <Text className="text-xs text-gray-500">
                    <Ionicons name="time-outline" size={15} /> {ride.time}
                  </Text>

                  <Text className="text-xs text-gray-500">
                    <Ionicons name="people-outline" size={15} /> {ride.seats}{" "}
                    seats
                  </Text>

                  <Text className="text-xs font-bold text-[#00A878]">
                    {ride.price} EGP
                  </Text>
                </View>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

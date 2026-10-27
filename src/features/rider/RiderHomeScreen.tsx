import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { rides } from "./riderData";

type Props = {
  onSearchPress: () => void;
  onRidePress: (rideId: number) => void;
  onNotificationPress: () => void;
};

export default function RiderHomeScreen({
  onSearchPress,
  onRidePress,
  onNotificationPress,
}: Props) {
  let startingPrice = rides.length > 0 ? rides[0].price : 0;

  for (const ride of rides) {
    if (ride.price < startingPrice) startingPrice = ride.price;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F5F8FC]" edges={["top"]}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="rounded-b-[28px] bg-[#071E3B] px-6 pb-8 pt-7">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-gray-300">Welcome back 👋</Text>
              <Text className="mt-1 text-2xl font-bold text-white">
                Uni Carpool
              </Text>
            </View>

            <Pressable
              onPress={onNotificationPress}
              className="h-12 w-12 items-center justify-center rounded-full bg-[#00A878]"
            >
              <Ionicons name="notifications-outline" size={28} color="white" />
            </Pressable>
          </View>

          <Text className="mt-6 text-lg font-semibold text-white">
            Where are you going today?
          </Text>
        </View>

        <View className="-mt-3 flex-row gap-3 px-6">
          <View className="flex-1 rounded-2xl bg-white p-4">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#E8F5FF]">
              <Ionicons name="car-outline" size={20} color="#07558C" />
            </View>
            <Text className="mt-4 text-3xl font-bold text-[#071E3B]">
              {rides.length}
            </Text>
            <Text className="mt-1 text-sm text-gray-400">Available Rides</Text>
          </View>

          <View className="flex-1 rounded-2xl bg-white p-4">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#E6F7F0]">
              <Ionicons name="cash-outline" size={20} color="#00A878" />
            </View>
            <Text className="mt-4 text-3xl font-bold text-[#071E3B]">
              {startingPrice} EGP
            </Text>
            <Text className="mt-1 text-sm text-gray-400">Starting From</Text>
          </View>
        </View>

        <View className="px-6 pb-6 pt-6">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-[#071E3B]">
              Available Rides
            </Text>

            <Pressable
              onPress={onSearchPress}
              style={({ pressed }) => ({
                transform: [{ scale: pressed ? 1.08 : 1 }],
              })}
              className="flex-row items-center gap-1"
            >
              <Text className="font-semibold text-[#00A878]">See All</Text>
              <Ionicons name="arrow-forward" size={16} color="#00A878" />
            </Pressable>
          </View>

          {rides
            .filter((ride, index) => index < 2)
            .map((ride) => (
              <Pressable
                key={ride.id}
                onPress={() => onRidePress(ride.id)}
                style={({ pressed }) => ({
                  transform: [{ scale: pressed ? 1.02 : 1 }],
                  opacity: pressed ? 0.95 : 1,
                })}
                className="mb-4 rounded-2xl bg-white p-5"
              >
                <View className="flex-row items-start justify-between">
                  <View className="flex-row items-center">
                    <View className="h-10 w-10 items-center justify-center rounded-full bg-[#E8F5FF]">
                      <Ionicons
                        name="person-outline"
                        size={20}
                        color="#07558C"
                      />
                    </View>

                    <View className="ml-3">
                      <Text className="font-bold text-[#071E3B]">
                        {ride.driver}
                      </Text>
                      <View className="mt-1 flex-row items-center">
                        <Ionicons name="star" size={14} color="#F59E0B" />
                        <Text className="ml-1 text-xs text-gray-500">
                          {ride.rating}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="rounded-full bg-[#E6F7F0] px-3 py-1">
                    <Text className="text-xs font-bold text-[#00A878]">
                      {ride.price} EGP
                    </Text>
                  </View>
                </View>

                <View className="mt-4 flex-row">
                  <View className="mr-3 items-center">
                    <View className="h-3 w-3 rounded-full bg-[#00A878]" />
                    <View className="h-8 w-[1px] bg-gray-300" />
                    <View className="h-3 w-3 rounded-full bg-[#07558C]" />
                  </View>

                  <View className="flex-1">
                    <Text className="text-xs text-gray-400">From</Text>
                    <Text className="font-semibold text-[#071E3B]">
                      {ride.from}
                    </Text>
                    <Text className="mt-2 text-xs text-gray-400">To</Text>
                    <Text className="font-semibold text-[#071E3B]">
                      {ride.to}
                    </Text>
                  </View>
                </View>

                <View className="mt-4 flex-row items-center justify-between border-t border-gray-100 pt-4">
                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={16} color="#64748B" />
                    <Text className="ml-1 text-sm text-gray-500">
                      {ride.time}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <Ionicons name="people-outline" size={16} color="#64748B" />
                    <Text className="ml-1 text-sm text-gray-500">
                      {ride.seats} seats
                    </Text>
                  </View>

                  <View className="h-9 w-9 items-center justify-center rounded-full bg-[#E6F7F0]">
                    <Ionicons name="arrow-forward" size={19} color="#00A878" />
                  </View>
                </View>
              </Pressable>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

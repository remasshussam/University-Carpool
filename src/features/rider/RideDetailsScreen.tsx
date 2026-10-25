import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { rides } from "./riderData";

type Props = {
  rideId: number;
  onBackPress: () => void;
  onRequestPress: (rideId: number) => void;
};

export default function RideDetailsScreen({
  rideId,
  onBackPress,
  onRequestPress,
}: Props) {
  const ride = rides.find((item) => item.id === rideId);

  const rideInfo = ride
    ? [
        { label: "Date", value: ride.date },
        { label: "Time", value: ride.time },
        { label: "Available Seats", value: `${ride.seats} seats` },
        { label: "Fare per Seat", value: `${ride.price} EGP` },
      ]
    : [];

  return (
    <SafeAreaView className="flex-1 bg-[#F5F8FC]" edges={["top"]}>
      <View className="flex-row items-center bg-[#071E3B] px-5 py-5">
        <Pressable onPress={onBackPress} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>

        <Text className="text-xl font-bold text-white">Ride Details</Text>
      </View>

      {!ride ? (
        <View className="flex-1 items-center justify-center">
          <Text className="font-semibold text-[#071E3B]">Ride not found</Text>
        </View>
      ) : (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="mx-4 mt-5 flex-row items-center rounded-2xl bg-white p-4">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-[#E8F5FF]">
              <Ionicons name="person-outline" size={28} color="#07558C" />
            </View>

            <View className="ml-3 flex-1">
              <Text className="text-base font-bold text-[#071E3B]">
                {ride.driver}
              </Text>

              <View className="mt-1 flex-row items-center">
                <Ionicons name="star" size={15} color="#F59E0B" />
                <Text className="ml-1 text-xs text-gray-500">
                  {ride.rating}
                </Text>
              </View>
            </View>
          </View>

          <View className="mx-4 mt-4 rounded-2xl bg-white p-5">
            <Text className="mb-5 text-lg font-bold text-[#071E3B]">Route</Text>

            <View className="flex-row">
              <View className="mr-4 items-center">
                <View className="h-4 w-4 rounded-full border-4 border-[#00A878] bg-white" />
                <View className="h-14 w-1 bg-[#07558C]" />
                <View className="h-4 w-4 rounded-full border-4 border-[#07558C] bg-white" />
              </View>

              <View className="flex-1 justify-between">
                <View>
                  <Text className="font-bold text-[#071E3B]">{ride.from}</Text>
                  <Text className="mt-1 text-xs text-gray-500">
                    Pickup Location
                  </Text>
                </View>

                <View>
                  <Text className="font-bold text-[#071E3B]">{ride.to}</Text>
                  <Text className="mt-1 text-xs text-gray-500">
                    Destination
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mx-4 mt-4 rounded-2xl bg-white p-5">
            <Text className="mb-4 text-lg font-bold text-[#071E3B]">
              Ride Information
            </Text>

            {rideInfo.map((item) => (
              <View
                key={item.label}
                className="flex-row items-center justify-between border-b border-gray-100 py-3"
              >
                <Text className="text-sm text-gray-500">{item.label}</Text>

                <Text className="text-sm font-semibold text-[#071E3B]">
                  {item.value}
                </Text>
              </View>
            ))}
          </View>

          <Pressable
            onPress={() => onRequestPress(ride.id)}
            className="mx-4 mb-8 mt-6 h-14 items-center justify-center rounded-xl bg-[#00A878]"
          >
            <Text className="text-base font-bold text-white">
              Request to Join Ride
            </Text>
          </Pressable>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

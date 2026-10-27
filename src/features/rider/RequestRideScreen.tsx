import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { rides } from "./riderData";

type Props = {
  rideId: number;
  onBackPress: () => void;
  onConfirmPress: (rideId: number) => void;
};

export default function RequestRideScreen({
  rideId,
  onBackPress,
  onConfirmPress,
}: Props) {
  const ride = rides.find((item) => item.id === rideId);

  const rideInfo = ride
    ? [
        { label: "From", value: ride.from },
        { label: "To", value: ride.to },
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
        <Text className="text-xl font-bold text-white">Join Ride</Text>
      </View>

      {!ride ? (
        <View className="flex-1 items-center justify-center">
          <Text className="font-semibold text-[#071E3B]">Ride not found</Text>
        </View>
      ) : (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="items-center px-6 pt-8">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-[#E6F7F0]">
              <Ionicons name="car-sport-outline" size={43} color="#07558C" />
            </View>

            <Text className="mt-5 text-2xl font-bold text-[#071E3B]">
              Confirm Your Ride
            </Text>

            <Text className="mt-2 text-center text-sm text-gray-500">
              Review the ride details before sending your request.
            </Text>
          </View>

          <View className="mx-4 mt-6 rounded-2xl bg-white p-5">
            <View className="flex-row items-center border-b border-gray-100 pb-4">
              <View className="h-12 w-12 items-center justify-center rounded-full bg-[#E8F5FF]">
                <Ionicons name="person-outline" size={25} color="#07558C" />
              </View>

              <Text className="ml-3 text-base font-bold text-[#071E3B]">
                {ride.driver}
              </Text>
            </View>

            {rideInfo.map((item) => (
              <View
                key={item.label}
                className="flex-row items-center justify-between py-3"
              >
                <Text className="flex-1 text-sm text-gray-500">
                  {item.label}
                </Text>

                <Text className="text-sm font-semibold text-[#071E3B]">
                  {item.value}
                </Text>
              </View>
            ))}
          </View>

          <View className="mx-4 mt-5 flex-row items-center rounded-xl bg-[#E8F5FF] p-4">
            <Ionicons
              name="information-circle-outline"
              size={23}
              color="#07558C"
            />
            <Text className="ml-3 flex-1 text-sm text-[#07558C]">
              You can track your request status in My Requests.
            </Text>
          </View>

          <Pressable
            onPress={() => onConfirmPress(ride.id)}
            className="mx-4 mb-8 mt-6 h-14 items-center justify-center rounded-xl bg-[#00A878]"
          >
            <Text className="text-base font-bold text-white">
              Confirm Request
            </Text>
          </Pressable>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

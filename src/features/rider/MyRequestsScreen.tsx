import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export type RideRequest = {
  id: number;
  rideId: number;
  driver: string;
  from: string;
  to: string;
  date: string;
  time: string;
  fare: number;
  status: "pending" | "accepted" | "rejected" | "cancelled";
};

type Props = {
  requests: RideRequest[];
  onCancelRequest: (id: number) => void;
};

type Status = RideRequest["status"];

const tabs: Status[] = ["pending", "accepted", "rejected", "cancelled"];

const notes = {
  pending: "",
  accepted: "✓ Your ride request has been accepted!",
  rejected: "Your ride request was not accepted.",
  cancelled: "This ride request was cancelled.",
};

export default function MyRequestsScreen({ requests, onCancelRequest }: Props) {
  const [activeTab, setActiveTab] = useState<Status>("pending");
  const [cancelId, setCancelId] = useState<number | null>(null);

  const filtered = requests.filter((r) => r.status === activeTab);

  const confirmCancel = () => {
    if (cancelId === null) return;
    onCancelRequest(cancelId);
    setCancelId(null);
    setActiveTab("cancelled");
  };

  const statusColor =
    activeTab === "pending"
      ? "text-amber-600"
      : activeTab === "accepted"
        ? "text-[#00A878]"
        : activeTab === "rejected"
          ? "text-red-500"
          : "text-gray-500";

  const statusBg =
    activeTab === "pending"
      ? "bg-amber-50"
      : activeTab === "accepted"
        ? "bg-green-50"
        : activeTab === "rejected"
          ? "bg-red-50"
          : "bg-gray-100";

  return (
    <SafeAreaView className="flex-1 bg-[#F5F8FC]" edges={["top"]}>
      <View className="bg-[#071E3B] px-5 py-5">
        <Text className="text-xl font-bold text-white">My Ride Requests</Text>
      </View>

      <View className="flex-row bg-white px-2">
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 items-center border-b-[3px] py-4 ${
              activeTab === tab ? "border-[#00A878]" : "border-transparent"
            }`}
          >
            <Text
              className={`text-xs font-semibold capitalize ${
                activeTab === tab ? "text-[#00A878]" : "text-gray-400"
              }`}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView className="flex-1">
        <View className="px-4 pb-8 pt-4">
          {filtered.length === 0 ? (
            <View className="mt-16 items-center">
              <Ionicons name="car-outline" size={60} color="#94A3B8" />
              <Text className="mt-4 text-lg font-bold text-[#071E3B]">
                No {activeTab} requests
              </Text>
              <Text className="mt-2 text-center text-gray-500">
                Your {activeTab} requests will appear here.
              </Text>
            </View>
          ) : (
            filtered.map((r) => (
              <View key={r.id} className="mb-4 rounded-2xl bg-white p-5">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 flex-row items-center">
                    <Ionicons
                      name="person-circle-outline"
                      size={42}
                      color="#07558C"
                    />
                    <Text className="ml-3 flex-1 font-bold text-[#071E3B]">
                      {r.driver}
                    </Text>
                  </View>

                  <View className={`rounded-full px-3 py-1 ${statusBg}`}>
                    <Text
                      className={`text-xs font-semibold capitalize ${statusColor}`}
                    >
                      {r.status}
                    </Text>
                  </View>
                </View>

                <View className="mt-5 flex-row items-center">
                  <Ionicons name="location-outline" size={18} color="#00A878" />
                  <Text className="ml-2 flex-1 text-sm text-[#071E3B]">
                    {r.from} → {r.to}
                  </Text>
                </View>

                <View className="mt-4 flex-row items-center justify-between">
                  <Text className="text-xs text-gray-500">{r.date}</Text>
                  <Text className="text-xs text-gray-500">{r.time}</Text>
                  <Text className="text-sm font-bold text-[#00A878]">
                    {r.fare} EGP
                  </Text>
                </View>

                {r.status === "pending" ? (
                  <Pressable
                    onPress={() => setCancelId(r.id)}
                    className="mt-5 h-11 items-center justify-center rounded-xl border border-red-200"
                  >
                    <Text className="font-semibold text-red-500">
                      Cancel Request
                    </Text>
                  </Pressable>
                ) : (
                  <Text className={`mt-4 text-sm ${statusColor}`}>
                    {notes[r.status]}
                  </Text>
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {cancelId !== null && (
        <View className="absolute inset-0 z-50 items-center justify-center bg-black/50 px-7">
          <View className="w-full items-center rounded-3xl bg-white p-6">
            <Ionicons name="alert-circle" size={55} color="#F59E0B" />

            <Text className="mt-4 text-xl font-bold text-[#071E3B]">
              Cancel Ride Request?
            </Text>
            <Text className="mt-2 text-center text-sm text-gray-500">
              Are you sure you want to cancel this request?
            </Text>

            <Pressable
              onPress={confirmCancel}
              className="mt-6 h-12 w-full items-center justify-center rounded-xl bg-red-500"
            >
              <Text className="font-bold text-white">Yes, Cancel</Text>
            </Pressable>

            <Pressable
              onPress={() => setCancelId(null)}
              className="mt-3 h-12 w-full items-center justify-center rounded-xl bg-gray-100"
            >
              <Text className="font-semibold text-[#071E3B]">Keep Request</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

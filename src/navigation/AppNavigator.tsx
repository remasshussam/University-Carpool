import React, { useState } from "react";
import {
  NavigationContainer,
  type NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import RiderHomeScreen from "../features/rider/RiderHomeScreen";
import SearchRidesScreen from "../features/rider/SearchRidesScreen";
import RideDetailsScreen from "../features/rider/RideDetailsScreen";
import RequestRideScreen from "../features/rider/RequestRideScreen";
import NotificationsScreen from "../features/rider/NotificationsScreen";
import MyRequestsScreen, {
  type RideRequest,
} from "../features/rider/MyRequestsScreen";
import { rides } from "../features/rider/riderData";

type TabParams = {
  Home: undefined;
  Search: undefined;
  MyRequests: undefined;
  Profile: undefined;
};

type RootParams = {
  RiderTabs: NavigatorScreenParams<TabParams> | undefined;
  RideDetails: { rideId: number };
  RequestRide: { rideId: number };
  Notifications: undefined;
};

const Stack = createNativeStackNavigator<RootParams>();
const Tab = createBottomTabNavigator<TabParams>();

const icons = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  MyRequests: ["list-circle", "list-circle-outline"],
  Profile: ["person", "person-outline"],
} as const;

function ProfilePlaceholder() {
  return (
    <SafeAreaView className="flex-1 bg-[#F5F8FC]" edges={["top"]}>
      <View className="bg-[#071E3B] px-5 py-5">
        <Text className="text-xl font-bold text-white">My Profile</Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <Ionicons name="person-circle-outline" size={80} color="#07558C" />
        <Text className="mt-4 font-bold text-[#071E3B]">
          Profile Coming Soon
        </Text>
      </View>
    </SafeAreaView>
  );
}

type TabsProps = {
  requests: RideRequest[];
  onCancelRequest: (id: number) => void;
  onRidePress: (id: number) => void;
  onNotificationPress: () => void;
};

function RiderTabs({
  requests,
  onCancelRequest,
  onRidePress,
  onNotificationPress,
}: TabsProps) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#00A878",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: { height: 65, paddingTop: 6, paddingBottom: 7 },
        tabBarLabelStyle: { fontSize: 10, fontWeight: "600" },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={icons[route.name][focused ? 0 : 1]}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Home">
        {({ navigation }) => (
          <RiderHomeScreen
            onSearchPress={() => navigation.navigate("Search")}
            onRidePress={onRidePress}
            onNotificationPress={onNotificationPress}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Search">
        {() => <SearchRidesScreen onRidePress={onRidePress} />}
      </Tab.Screen>

      <Tab.Screen name="MyRequests" options={{ title: "My Requests" }}>
        {() => (
          <MyRequestsScreen
            requests={requests}
            onCancelRequest={onCancelRequest}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Profile" component={ProfilePlaceholder} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [requests, setRequests] = useState<RideRequest[]>(
    rides
      .filter((r) => r.id === 2 || r.id === 3)
      .map(
        (r): RideRequest => ({
          id: r.id + 98,
          rideId: r.id,
          driver: r.driver,
          from: r.from,
          to: r.to,
          date: r.date,
          time: r.time,
          fare: r.price,
          status: r.id === 2 ? "accepted" : "rejected",
        }),
      ),
  );

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const addRequest = (rideId: number) => {
    const ride = rides.find((r) => r.id === rideId);
    const existing = requests.find(
      (r) =>
        r.rideId === rideId &&
        (r.status === "pending" || r.status === "accepted"),
    );

    if (!ride || existing) {
      setSuccess(false);
      setMessage(
        !ride
          ? "This ride is not available."
          : existing?.status === "accepted"
            ? "This ride request is already accepted."
            : "You already have a pending request for this ride.",
      );
      return;
    }

    setRequests((prev) => [
      {
        id: Date.now(),
        rideId,
        driver: ride.driver,
        from: ride.from,
        to: ride.to,
        date: ride.date,
        time: ride.time,
        fare: ride.price,
        status: "pending",
      },
      ...prev,
    ]);

    setSuccess(true);
    setMessage("Your request has been added to Pending.");
  };

  const cancelRequest = (id: number) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id && r.status === "pending"
          ? { ...r, status: "cancelled" }
          : r,
      ),
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="RiderTabs"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="RiderTabs">
          {({ navigation }) => (
            <RiderTabs
              requests={requests}
              onCancelRequest={cancelRequest}
              onRidePress={(id) =>
                navigation.navigate("RideDetails", { rideId: id })
              }
              onNotificationPress={() => navigation.navigate("Notifications")}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="RideDetails">
          {({ navigation, route }) => (
            <RideDetailsScreen
              rideId={route.params.rideId}
              onBackPress={() => navigation.goBack()}
              onRequestPress={(id) =>
                navigation.navigate("RequestRide", { rideId: id })
              }
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="RequestRide">
          {({ navigation, route }) => (
            <View className="flex-1">
              <RequestRideScreen
                rideId={route.params.rideId}
                onBackPress={() => navigation.goBack()}
                onConfirmPress={addRequest}
              />

              {message !== "" && (
                <View className="absolute inset-0 z-50 items-center justify-center bg-black/50 px-7">
                  <View className="w-full items-center rounded-3xl bg-white p-6">
                    <Ionicons
                      name={success ? "checkmark-circle" : "alert-circle"}
                      size={55}
                      color={success ? "#00A878" : "#EF4444"}
                    />
                    <Text className="mt-4 text-center text-xl font-bold text-[#071E3B]">
                      {success ? "Request Sent!" : "Something Needs Attention"}
                    </Text>
                    <Text className="mt-2 text-center text-sm text-gray-500">
                      {message}
                    </Text>
                    <Pressable
                      onPress={() => {
                        setMessage("");
                        if (success)
                          navigation.popTo("RiderTabs", {
                            screen: "MyRequests",
                          });
                      }}
                      className="mt-6 h-12 w-full items-center justify-center rounded-xl bg-[#00A878]"
                    >
                      <Text className="font-bold text-white">
                        {success ? "View My Requests" : "Got it"}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name="Notifications">
          {({ navigation }) => (
            <NotificationsScreen onBackPress={() => navigation.goBack()} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

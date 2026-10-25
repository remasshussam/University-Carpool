import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'ManageRequests'
>;

const REQUESTS = [
  {
    id: '1',
    name: 'Mariam Ali',
    initials: 'MA',
    rating: '4.8',
    pickup: 'Main Gate',
    destination: 'University Campus',
    date: '28 October',
    time: '10:30 AM',
    seats: 1,
  },
  {
    id: '2',
    name: 'Omar Khaled',
    initials: 'OK',
    rating: '4.6',
    pickup: 'Main Gate',
    destination: 'University Campus',
    date: '28 October',
    time: '10:30 AM',
    seats: 1,
  },
];

export default function ManageRequestsScreen({
  navigation,
}: Props) {
  const [requests, setRequests] = useState(REQUESTS);

  const acceptRequest = (id: string) => {
    setRequests(
      requests.filter((request) => request.id !== id)
    );
  };

  const rejectRequest = (id: string) => {
    setRequests(
      requests.filter((request) => request.id !== id)
    );
  };

  return (
    <View className="flex-1 bg-slate-100">
      {/* Header */}
      <View className="bg-slate-950 px-5 pb-5 pt-14">
        <View className="flex-row items-center">
          <Pressable
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            className="mr-4 active:opacity-70"
          >
            <Ionicons
              name="arrow-back"
              size={26}
              color="white"
            />
          </Pressable>

          <View>
            <Text className="text-3xl font-bold text-white">
              New Ride Requests
            </Text>

            <Text className="mt-1 text-sm text-slate-400">
              Review passenger requests
            </Text>
          </View>
        </View>
      </View>

      {/* Request List */}
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-4 py-5"
        ListEmptyComponent={
          <View className="mt-20 items-center">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <Ionicons
                name="checkmark-circle-outline"
                size={40}
                color="#059669"
              />
            </View>

            <Text className="mt-4 text-xl font-bold text-slate-900">
              No New Requests
            </Text>

            <Text className="mt-2 text-center text-sm text-slate-500">
              You have reviewed all ride requests.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="mb-4 rounded-2xl bg-white p-5">
            {/* Rider */}
            <View className="flex-row items-center">
              <View className="h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                <Text className="text-base font-bold text-emerald-700">
                  {item.initials}
                </Text>
              </View>

              <View className="ml-4 flex-1">
                <Text className="text-lg font-bold text-slate-900">
                  {item.name}
                </Text>

                <View className="mt-1 flex-row items-center">
                  <Ionicons
                    name="star"
                    size={16}
                    color="#f59e0b"
                  />

                  <Text className="ml-1 text-sm text-slate-500">
                    {item.rating}
                  </Text>
                </View>
              </View>

              <View className="rounded-full bg-blue-100 px-3 py-1">
                <Text className="text-xs font-semibold text-blue-700">
                  New
                </Text>
              </View>
            </View>

            {/* Route */}
            <View className="mt-5 rounded-xl bg-slate-50 p-4">
              <View className="flex-row">
                <View className="mr-3 items-center">
                  <View className="h-3 w-3 rounded-full bg-emerald-600" />
                  <View className="my-1 h-8 w-0.5 bg-slate-300" />
                  <View className="h-3 w-3 rounded-full bg-red-500" />
                </View>

                <View className="flex-1">
                  <View>
                    <Text className="text-xs text-slate-400">
                      Pickup
                    </Text>

                    <Text className="font-semibold text-slate-900">
                      {item.pickup}
                    </Text>
                  </View>

                  <View className="mt-3">
                    <Text className="text-xs text-slate-400">
                      Destination
                    </Text>

                    <Text className="font-semibold text-slate-900">
                      {item.destination}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Date and Time */}
            <View className="mt-4 flex-row">
              <View className="mr-5 flex-row items-center">
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color="#64748b"
                />

                <Text className="ml-2 text-sm text-slate-600">
                  {item.date}
                </Text>
              </View>

              <View className="flex-row items-center">
                <Ionicons
                  name="time-outline"
                  size={18}
                  color="#64748b"
                />

                <Text className="ml-2 text-sm text-slate-600">
                  {item.time}
                </Text>
              </View>
            </View>

            {/* Seats */}
            <View className="mt-3 flex-row items-center">
              <Ionicons
                name="person-outline"
                size={18}
                color="#64748b"
              />

              <Text className="ml-2 text-sm text-slate-600">
                {item.seats} seat requested
              </Text>
            </View>

            {/* Buttons */}
            <View className="mt-5 flex-row gap-3">
              <Pressable
                onPress={() => rejectRequest(item.id)}
                accessibilityRole="button"
                className="flex-1 items-center rounded-xl border border-red-500 py-3 active:opacity-70"
              >
                <Text className="font-bold text-red-500">
                  Reject
                </Text>
              </Pressable>

              <Pressable
                onPress={() => acceptRequest(item.id)}
                accessibilityRole="button"
                className="flex-1 items-center rounded-xl bg-emerald-600 py-3 active:opacity-70"
              >
                <Text className="font-bold text-white">
                  Accept
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}
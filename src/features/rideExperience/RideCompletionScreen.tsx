import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'RideCompletion'
>;

export default function RideCompletionScreen({
  navigation,
}: Props) {
  const [rideCompleted, setRideCompleted] = useState(false);

  const completeRide = () => {
    setRideCompleted(true);
  };

  return (
    <View className="flex-1 bg-slate-100">
      {/* Header */}
      <View className="bg-slate-950 px-5 pb-5 pt-14">
        <View className="flex-row items-center">
          {/* Back Arrow */}
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
              Ride Completion
            </Text>

            <Text className="mt-1 text-sm text-slate-400">
              Complete your finished ride
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerClassName="px-4 py-5"
        showsVerticalScrollIndicator={false}
      >
        {/* Completion Status */}
        <View
          className={`mb-4 rounded-2xl p-5 ${
            rideCompleted
              ? 'bg-emerald-50'
              : 'bg-white'
          }`}
        >
          <View className="items-center">
            <View
              className={`h-20 w-20 items-center justify-center rounded-full ${
                rideCompleted
                  ? 'bg-emerald-600'
                  : 'bg-slate-200'
              }`}
            >
              <Ionicons
                name={
                  rideCompleted
                    ? 'checkmark'
                    : 'car-outline'
                }
                size={38}
                color={
                  rideCompleted
                    ? 'white'
                    : '#475569'
                }
              />
            </View>

            <Text className="mt-4 text-xl font-bold text-slate-900">
              {rideCompleted
                ? 'Ride Completed!'
                : 'Finish Your Ride'}
            </Text>

            <Text className="mt-2 text-center text-sm leading-6 text-slate-500">
              {rideCompleted
                ? 'The ride has been successfully completed.'
                : 'Confirm that you have reached your destination.'}
            </Text>
          </View>
        </View>

        {/* Ride Summary */}
        <View className="mb-4 rounded-2xl bg-white p-5">
          <Text className="mb-5 text-lg font-bold text-slate-900">
            Ride Summary
          </Text>

          {/* Pickup */}
          <View className="mb-5 flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
              <Ionicons
                name="location-outline"
                size={21}
                color="#059669"
              />
            </View>

            <View className="ml-3">
              <Text className="text-xs text-slate-400">
                Pickup
              </Text>

              <Text className="mt-1 font-bold text-slate-900">
                Main Gate
              </Text>
            </View>
          </View>

          {/* Destination */}
          <View className="mb-5 flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <Ionicons
                name="flag-outline"
                size={21}
                color="#ef4444"
              />
            </View>

            <View className="ml-3">
              <Text className="text-xs text-slate-400">
                Destination
              </Text>

              <Text className="mt-1 font-bold text-slate-900">
                University Campus
              </Text>
            </View>
          </View>

          {/* Date */}
          <View className="mb-5 flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Ionicons
                name="calendar-outline"
                size={21}
                color="#2563eb"
              />
            </View>

            <View className="ml-3">
              <Text className="text-xs text-slate-400">
                Date
              </Text>

              <Text className="mt-1 font-bold text-slate-900">
                28 October
              </Text>
            </View>
          </View>

          {/* Time */}
          <View className="flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-orange-100">
              <Ionicons
                name="time-outline"
                size={21}
                color="#f97316"
              />
            </View>

            <View className="ml-3">
              <Text className="text-xs text-slate-400">
                Time
              </Text>

              <Text className="mt-1 font-bold text-slate-900">
                10:30 AM
              </Text>
            </View>
          </View>
        </View>

        {/* Participants */}
        <View className="mb-4 rounded-2xl bg-white p-5">
          <Text className="mb-4 text-lg font-bold text-slate-900">
            Participants
          </Text>

          <View className="flex-row items-center">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Text className="font-bold text-blue-700">
                MA
              </Text>
            </View>

            <View className="ml-3 flex-1">
              <Text className="font-bold text-slate-900">
                Mariam Ali
              </Text>

              <Text className="text-sm text-slate-500">
                Passenger
              </Text>
            </View>

            {rideCompleted && (
              <Pressable
                accessibilityRole="button"
                className="rounded-lg bg-emerald-100 px-3 py-2 active:opacity-70"
              >
                <Text className="font-semibold text-emerald-700">
                  Rate
                </Text>
              </Pressable>
            )}
          </View>

          <View className="mt-4 flex-row items-center">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <Text className="font-bold text-purple-700">
                OK
              </Text>
            </View>

            <View className="ml-3 flex-1">
              <Text className="font-bold text-slate-900">
                Omar Khaled
              </Text>

              <Text className="text-sm text-slate-500">
                Passenger
              </Text>
            </View>

            {rideCompleted && (
              <Pressable
                accessibilityRole="button"
                className="rounded-lg bg-emerald-100 px-3 py-2 active:opacity-70"
              >
                <Text className="font-semibold text-emerald-700">
                  Rate
                </Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Complete Ride Button */}
        {!rideCompleted && (
          <Pressable
            onPress={completeRide}
            accessibilityRole="button"
            className="mb-5 flex-row items-center justify-center rounded-xl bg-emerald-600 py-4 active:opacity-70"
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={22}
              color="white"
            />

            <Text className="ml-2 font-bold text-white">
              Mark Ride as Completed
            </Text>
          </Pressable>
        )}

        {/* Completed Message */}
        {rideCompleted && (
          <View className="mb-5 rounded-xl bg-emerald-600 p-4">
            <Text className="text-center font-bold text-white">
              Ride successfully completed
            </Text>

            <Text className="mt-1 text-center text-sm text-emerald-100">
              You can now rate the participants.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
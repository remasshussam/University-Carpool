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
  'UpcomingRide'
>;

export default function UpcomingRideScreen({
  navigation,
}: Props) {
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
              Upcoming Ride
            </Text>

            <Text className="mt-1 text-sm text-slate-400">
              Your confirmed ride details
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerClassName="px-4 py-5"
        showsVerticalScrollIndicator={false}
      >
        {/* Ride Status */}
        <View className="mb-4 rounded-2xl bg-emerald-50 p-4">
          <View className="flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-emerald-600">
              <Ionicons
                name="checkmark"
                size={22}
                color="white"
              />
            </View>

            <View className="ml-3">
              <Text className="font-bold text-emerald-700">
                Ride Confirmed
              </Text>

              <Text className="mt-1 text-sm text-emerald-600">
                Your seat is confirmed
              </Text>
            </View>
          </View>
        </View>

        {/* Route */}
        <View className="mb-4 rounded-2xl bg-white p-5">
          <Text className="mb-5 text-lg font-bold text-slate-900">
            Route
          </Text>

          <View className="flex-row">
            <View className="mr-4 items-center">
              <View className="h-4 w-4 rounded-full bg-emerald-600" />

              <View className="my-1 h-12 w-0.5 bg-slate-300" />

              <View className="h-4 w-4 rounded-full bg-red-500" />
            </View>

            <View className="flex-1">
              <View>
                <Text className="text-xs text-slate-400">
                  Pickup
                </Text>

                <Text className="mt-1 font-bold text-slate-900">
                  Main Gate
                </Text>
              </View>

              <View className="mt-6">
                <Text className="text-xs text-slate-400">
                  Destination
                </Text>

                <Text className="mt-1 font-bold text-slate-900">
                  University Campus
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Date and Time */}
        <View className="mb-4 flex-row gap-3">
          <View className="flex-1 rounded-2xl bg-white p-4">
            <Ionicons
              name="calendar-outline"
              size={22}
              color="#059669"
            />

            <Text className="mt-3 text-xs text-slate-400">
              Date
            </Text>

            <Text className="mt-1 font-bold text-slate-900">
              28 October
            </Text>
          </View>

          <View className="flex-1 rounded-2xl bg-white p-4">
            <Ionicons
              name="time-outline"
              size={22}
              color="#059669"
            />

            <Text className="mt-3 text-xs text-slate-400">
              Time
            </Text>

            <Text className="mt-1 font-bold text-slate-900">
              10:30 AM
            </Text>
          </View>
        </View>

        {/* Driver */}
        <View className="mb-4 rounded-2xl bg-white p-5">
          <Text className="mb-4 text-lg font-bold text-slate-900">
            Driver
          </Text>

          <View className="flex-row items-center">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <Text className="text-base font-bold text-emerald-700">
                AH
              </Text>
            </View>

            <View className="ml-4 flex-1">
              <Text className="text-base font-bold text-slate-900">
                Ahmed Hassan
              </Text>

              <Text className="mt-1 text-sm text-slate-500">
                Toyota Corolla
              </Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons
                name="star"
                size={18}
                color="#f59e0b"
              />

              <Text className="ml-1 font-semibold text-slate-700">
                4.8
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
            <View className="h-11 w-11 items-center justify-center rounded-full bg-blue-100">
              <Text className="font-bold text-blue-700">
                MA
              </Text>
            </View>

            <View className="ml-3">
              <Text className="font-bold text-slate-900">
                Mariam Ali
              </Text>

              <Text className="text-sm text-slate-500">
                Passenger
              </Text>
            </View>
          </View>

          <View className="mt-4 flex-row items-center">
            <View className="h-11 w-11 items-center justify-center rounded-full bg-purple-100">
              <Text className="font-bold text-purple-700">
                OK
              </Text>
            </View>

            <View className="ml-3">
              <Text className="font-bold text-slate-900">
                Omar Khaled
              </Text>

              <Text className="text-sm text-slate-500">
                Passenger
              </Text>
            </View>
          </View>
        </View>

        {/* Pickup Details */}
        <View className="mb-4 rounded-2xl bg-white p-5">
          <View className="flex-row items-center">
            <Ionicons
              name="location-outline"
              size={24}
              color="#059669"
            />

            <Text className="ml-2 text-lg font-bold text-slate-900">
              Pickup Details
            </Text>
          </View>

          <Text className="mt-3 text-sm leading-6 text-slate-500">
            Meet at the university main gate near the security
            entrance.
          </Text>
        </View>

        {/* Message Driver */}
        <Pressable
          onPress={() => navigation.navigate('ChatList')}
          accessibilityRole="button"
          className="mb-3 flex-row items-center justify-center rounded-xl bg-emerald-600 py-4 active:opacity-70"
        >
          <Ionicons
            name="chatbubble-outline"
            size={20}
            color="white"
          />

          <Text className="ml-2 font-bold text-white">
            Message Driver
          </Text>
        </Pressable>

        {/* Complete Ride */}
        <Pressable
          onPress={() => navigation.navigate('RideCompletion')}
          accessibilityRole="button"
          className="mb-5 flex-row items-center justify-center rounded-xl bg-slate-950 py-4 active:opacity-70"
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={21}
            color="white"
          />

          <Text className="ml-2 font-bold text-white">
            Complete Ride
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator, type BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';

import ForgotPasswordScreen from '@/features/auth/ForgotPasswordScreen';
import LoginScreen from '@/features/auth/LoginScreen';
import SignupScreen from '@/features/auth/SignupScreen';
import CreateRideScreen from '@/features/driver/CreateRideScreen';
import DriverHomeScreen from '@/features/driver/DriverHomeScreen';
import EditCancelRideScreen from '@/features/driver/EditCancelRideScreen';
import DriverManageRequestsScreen from '@/features/driver/ManageRequestsScreen';
import MyRidesScreen from '@/features/driver/MyRidesScreen';
import ChangePasswordScreen from '@/features/profile/ChangePasswordScreen';
import EditProfileScreen from '@/features/profile/EditProfileScreen';
import ProfileScreen from '@/features/profile/ProfileScreen';
import PublicProfileScreen from '@/features/profile/PublicProfileScreen';
import RateUserScreen from '@/features/profile/RateUserScreen';
import RatingsReviewsScreen from '@/features/profile/RatingsReviewsScreen';
import RideHistoryScreen from '@/features/profile/RideHistoryScreen';
import SettingsScreen from '@/features/profile/SettingsScreen';
import ChatListScreen from '@/features/rideExperience/ChatListScreen';
import ChatScreen from '@/features/rideExperience/ChatScreen';
import ExperienceManageRequestsScreen from '@/features/rideExperience/ManageRequestsScreen';
import ExperienceNotificationsScreen from '@/features/rideExperience/NotificationsScreen';
import RideCompletionScreen from '@/features/rideExperience/RideCompletionScreen';
import UpcomingRideScreen from '@/features/rideExperience/UpcomingRideScreen';
import MyRequestsScreen, { type RideRequest } from '@/features/rider/MyRequestsScreen';
import RiderNotificationsScreen from '@/features/rider/NotificationsScreen';
import RequestRideScreen from '@/features/rider/RequestRideScreen';
import RideDetailsScreen from '@/features/rider/RideDetailsScreen';
import RiderHomeScreen from '@/features/rider/RiderHomeScreen';
import SearchRidesScreen from '@/features/rider/SearchRidesScreen';
import { rides } from '@/features/rider/riderData';
import {
  navigationRef,
  type DriverTabParams,
  type RiderTabParams,
  type RootStackParamList,
} from '@/navigation/navigationRef';

export type { RootStackParamList } from '@/navigation/navigationRef';
export {
  logoutToLogin,
  navigateToCreateRide,
  navigateToDriverHome,
  navigateToEditCancelRide,
  navigateToForgotPassword,
  navigateToLogin,
  navigateToManageRequests,
  navigateToMyRides,
  navigateToNotifications,
  navigateToProfile,
  navigateToRiderHome,
  navigateToSignUp,
} from '@/navigation/navigationRef';

const Stack = createNativeStackNavigator<RootStackParamList>();
const DriverTab = createBottomTabNavigator<DriverTabParams>();
const RiderTab = createBottomTabNavigator<RiderTabParams>();

const profileHeader = {
  headerShown: true,
  headerStyle: { backgroundColor: '#0B3C4D' },
  headerTintColor: '#FFFFFF',
  headerTitleAlign: 'center' as const,
  headerTitleStyle: { fontWeight: 'bold' as const },
  contentStyle: { backgroundColor: '#F3F4F6' },
};

const riderTabIcons = {
  Home: ['home', 'home-outline'],
  Search: ['search', 'search-outline'],
  MyRequests: ['list-circle', 'list-circle-outline'],
  Profile: ['person', 'person-outline'],
} as const;

function stackNavigation(navigation: BottomTabScreenProps<DriverTabParams>['navigation'] | BottomTabScreenProps<RiderTabParams>['navigation']) {
  return navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
}

function ProfileTab({
  navigation,
}: BottomTabScreenProps<DriverTabParams, 'Profile'> | BottomTabScreenProps<RiderTabParams, 'Profile'>) {
  const parent = stackNavigation(navigation);
  if (!parent) {
    return null;
  }
  return (
    <ProfileScreen
      navigation={parent as unknown as NativeStackScreenProps<RootStackParamList, 'Profile'>['navigation']}
      route={{ key: 'Profile', name: 'Profile', params: undefined }}
    />
  );
}

function DriverTabs() {
  return (
    <DriverTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00A878',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      }}>
      <DriverTab.Screen
        name="Home"
        component={DriverHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <DriverTab.Screen
        name="MyRides"
        component={MyRidesScreen}
        options={{
          title: 'My Rides',
          tabBarIcon: ({ color, size }) => <Ionicons name="car" color={color} size={size} />,
        }}
      />
      <DriverTab.Screen
        name="CreateRide"
        component={CreateRideScreen}
        options={{
          title: 'Create Ride',
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle" color={color} size={size} />,
        }}
      />
      <DriverTab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          title: 'My Profile',
          ...profileHeader,
          tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
        }}
      />
    </DriverTab.Navigator>
  );
}

type RiderTabsProps = {
  requests: RideRequest[];
  onCancelRequest: (id: number) => void;
  onRidePress: (id: number) => void;
  onNotificationPress: () => void;
};

function RiderTabs({ requests, onCancelRequest, onRidePress, onNotificationPress }: RiderTabsProps) {
  return (
    <RiderTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#00A878',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: { height: 65, paddingTop: 6, paddingBottom: 7 },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={riderTabIcons[route.name][focused ? 0 : 1]} size={size} color={color} />
        ),
      })}>
      <RiderTab.Screen name="Home">
        {() => (
          <RiderHomeScreen
            onSearchPress={() => navigationRef.navigate('RiderTabs', { screen: 'Search' })}
            onRidePress={onRidePress}
            onNotificationPress={onNotificationPress}
          />
        )}
      </RiderTab.Screen>
      <RiderTab.Screen name="Search">{() => <SearchRidesScreen onRidePress={onRidePress} />}</RiderTab.Screen>
      <RiderTab.Screen name="MyRequests" options={{ title: 'My Requests' }}>
        {() => <MyRequestsScreen requests={requests} onCancelRequest={onCancelRequest} />}
      </RiderTab.Screen>
      <RiderTab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          title: 'My Profile',
          ...profileHeader,
        }}
      />
    </RiderTab.Navigator>
  );
}

export default function AppNavigator() {
  const [requests, setRequests] = useState<RideRequest[]>(
    rides
      .filter((ride) => ride.id === 2 || ride.id === 3)
      .map(
        (ride): RideRequest => ({
          id: ride.id + 98,
          rideId: ride.id,
          driver: ride.driver,
          from: ride.from,
          to: ride.to,
          date: ride.date,
          time: ride.time,
          fare: ride.price,
          status: ride.id === 2 ? 'accepted' : 'rejected',
        }),
      ),
  );
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const addRequest = (rideId: number) => {
    const ride = rides.find((item) => item.id === rideId);
    const existing = requests.find(
      (item) => item.rideId === rideId && (item.status === 'pending' || item.status === 'accepted'),
    );

    if (!ride || existing) {
      setSuccess(false);
      setMessage(
        !ride
          ? 'This ride is not available.'
          : existing?.status === 'accepted'
            ? 'This ride request is already accepted.'
            : 'You already have a pending request for this ride.',
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
        status: 'pending',
      },
      ...prev,
    ]);
    setSuccess(true);
    setMessage('Your request has been added to Pending.');
  };

  const cancelRequest = (id: number) => {
    setRequests((prev) =>
      prev.map((item) => (item.id === id && item.status === 'pending' ? { ...item, status: 'cancelled' } : item)),
    );
  };

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="DriverTabs">
        {() => <DriverTabs />}
      </Stack.Screen>
      <Stack.Screen name="RiderTabs">
        {({ navigation }) => (
          <RiderTabs
            requests={requests}
            onCancelRequest={cancelRequest}
            onRidePress={(id) => navigation.navigate('RideDetails', { rideId: id })}
            onNotificationPress={() => navigation.navigate('RiderNotifications')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="DriverRequests" component={DriverManageRequestsScreen} />
      <Stack.Screen name="EditCancelRide" component={EditCancelRideScreen} />
      <Stack.Screen name="RideDetails">
        {({ navigation, route }) => (
          <RideDetailsScreen
            rideId={route.params.rideId}
            onBackPress={() => navigation.goBack()}
            onRequestPress={(id) => navigation.navigate('RequestRide', { rideId: id })}
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
            {message !== '' ? (
              <View className="absolute inset-0 z-50 items-center justify-center bg-black/50 px-7">
                <View className="w-full items-center rounded-3xl bg-white p-6">
                  <Ionicons
                    name={success ? 'checkmark-circle' : 'alert-circle'}
                    size={55}
                    color={success ? '#00A878' : '#EF4444'}
                  />
                  <Text className="mt-4 text-center text-xl font-bold text-[#071E3B]">
                    {success ? 'Request Sent!' : 'Something Needs Attention'}
                  </Text>
                  <Text className="mt-2 text-center text-sm text-gray-500">{message}</Text>
                  <Pressable
                    onPress={() => {
                      setMessage('');
                      if (success) {
                        navigation.popTo('RiderTabs', { screen: 'MyRequests' });
                      }
                    }}
                    className="mt-6 h-12 w-full items-center justify-center rounded-xl bg-[#00A878]">
                    <Text className="font-bold text-white">{success ? 'View My Requests' : 'Got it'}</Text>
                  </Pressable>
                </View>
              </View>
            ) : null}
          </View>
        )}
      </Stack.Screen>
      <Stack.Screen name="RiderNotifications">
        {({ navigation }) => <RiderNotificationsScreen onBackPress={() => navigation.goBack()} />}
      </Stack.Screen>
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ ...profileHeader, title: 'Edit Profile' }} />
      <Stack.Screen name="RideHistory" component={RideHistoryScreen} options={{ ...profileHeader, title: 'Ride History' }} />
      <Stack.Screen name="RateUser" component={RateUserScreen} options={{ ...profileHeader, title: 'Rate Your Ride' }} />
      <Stack.Screen
        name="RatingsReviews"
        component={RatingsReviewsScreen}
        options={{ ...profileHeader, title: 'Ratings & Reviews' }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ ...profileHeader, title: 'Settings' }} />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ ...profileHeader, title: 'Change Password' }}
      />
      <Stack.Screen name="PublicProfile" component={PublicProfileScreen} options={{ ...profileHeader, title: 'Profile' }} />
      <Stack.Screen name="Notifications" component={ExperienceNotificationsScreen} />
      <Stack.Screen name="ManageRequests" component={ExperienceManageRequestsScreen} />
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="UpcomingRide" component={UpcomingRideScreen} />
      <Stack.Screen name="RideCompletion" component={RideCompletionScreen} />
    </Stack.Navigator>
  );
}

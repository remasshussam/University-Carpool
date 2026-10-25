import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NotificationsScreen from '../features/rideExperience/NotificationsScreen';
import ManageRequestsScreen from '../features/rideExperience/ManageRequestsScreen';
import ChatListScreen from '../features/rideExperience/ChatListScreen';
import ChatScreen from '../features/rideExperience/ChatScreen';
import UpcomingRideScreen from '../features/rideExperience/UpcomingRideScreen';
import RideCompletionScreen from '../features/rideExperience/RideCompletionScreen';

export type RootStackParamList = {
  Notifications: undefined;
  ManageRequests: undefined;
  ChatList: undefined;
  Chat: undefined;
  UpcomingRide: undefined;
  RideCompletion: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Notifications"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
        />

        <Stack.Screen
          name="ManageRequests"
          component={ManageRequestsScreen}
        />

        <Stack.Screen
          name="ChatList"
          component={ChatListScreen}
        />

        <Stack.Screen
          name="Chat"
          component={ChatScreen}
        />

        <Stack.Screen
          name="UpcomingRide"
          component={UpcomingRideScreen}
        />

        <Stack.Screen
          name="RideCompletion"
          component={RideCompletionScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
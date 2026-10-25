import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@/features/auth/LoginScreen";
import SignupScreen from "@/features/auth/SignupScreen";
import ProfileScreen from "@/features/profile/ProfileScreen";
import EditProfileScreen from "@/features/profile/EditProfileScreen";
import RideHistoryScreen from "@/features/profile/RideHistoryScreen";
import RateUserScreen from "@/features/profile/RateUserScreen";
import RatingsReviewsScreen from "@/features/profile/RatingsReviewsScreen";
import SettingsScreen from "@/features/profile/SettingsScreen";
import ChangePasswordScreen from "@/features/profile/ChangePasswordScreen";
import PublicProfileScreen from "@/features/profile/PublicProfileScreen";

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Profile: undefined;
  EditProfile: undefined;
  RideHistory: undefined;
  RateUser: { rideId: string };
  RatingsReviews: undefined;
  Settings: undefined;
  ChangePassword: undefined;
  PublicProfile: { userId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: { backgroundColor: "#0B3C4D" },
        headerTintColor: "#FFFFFF",
        headerTitleAlign: "center",
        headerTitleStyle: { fontWeight: "bold" },
        contentStyle: { backgroundColor: "#F3F4F6" },
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "My Profile" }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Edit Profile" }} />
      <Stack.Screen name="RideHistory" component={RideHistoryScreen} options={{ title: "Ride History" }} />
      <Stack.Screen name="RateUser" component={RateUserScreen} options={{ title: "Rate Your Ride" }} />
      <Stack.Screen name="RatingsReviews" component={RatingsReviewsScreen} options={{ title: "Ratings & Reviews" }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings" }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: "Change Password" }} />
      <Stack.Screen name="PublicProfile" component={PublicProfileScreen} options={{ title: "Profile" }} />
    </Stack.Navigator>
  );
}
import { createNavigationContainerRef, type NavigatorScreenParams } from '@react-navigation/native';

import { getCurrentMockRole, mockSignOut, type AppRole } from '@/features/auth/authApi';

export type DriverTabParams = {
  Home: undefined;
  MyRides: { tab?: 'upcoming' | 'completed' | 'canceled'; focus?: string };
  CreateRide: undefined;
  Profile: undefined;
};

export type RiderTabParams = {
  Home: undefined;
  Search: undefined;
  MyRequests: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Login: { role?: AppRole } | undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  DriverTabs: NavigatorScreenParams<DriverTabParams> | undefined;
  RiderTabs: NavigatorScreenParams<RiderTabParams> | undefined;
  DriverRequests: { rideId?: string };
  EditCancelRide: { rideId: string };
  RideDetails: { rideId: number };
  RequestRide: { rideId: number };
  RiderNotifications: undefined;
  Profile: undefined;
  EditProfile: undefined;
  RideHistory: undefined;
  RateUser: { rideId: string };
  RatingsReviews: undefined;
  Settings: undefined;
  ChangePassword: undefined;
  PublicProfile: { userId: string };
  Notifications: undefined;
  ManageRequests: undefined;
  ChatList: undefined;
  Chat: undefined;
  UpcomingRide: undefined;
  RideCompletion: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

function resetTo(name: keyof RootStackParamList, params?: RootStackParamList[keyof RootStackParamList]) {
  if (!navigationRef.isReady()) {
    return;
  }
  navigationRef.reset({
    index: 0,
    routes: [{ name, params }],
  });
}

export function navigateToLogin(preferredRole?: AppRole) {
  mockSignOut();
  resetTo('Login', preferredRole ? { role: preferredRole } : undefined);
}

export function navigateToSignUp() {
  if (navigationRef.isReady()) {
    navigationRef.navigate('SignUp');
  }
}

export function navigateToForgotPassword() {
  if (navigationRef.isReady()) {
    navigationRef.navigate('ForgotPassword');
  }
}

export function navigateToDriverHome() {
  resetTo('DriverTabs');
}

export function navigateToRiderHome() {
  resetTo('RiderTabs');
}

export function logoutToLogin() {
  navigateToLogin();
}

export function navigateToCreateRide() {
  if (navigationRef.isReady()) {
    navigationRef.navigate('DriverTabs', { screen: 'CreateRide' });
  }
}

export function navigateToMyRides(tab?: 'upcoming' | 'completed' | 'canceled') {
  if (!navigationRef.isReady()) {
    return;
  }
  navigationRef.navigate('DriverTabs', {
    screen: 'MyRides',
    params: tab ? { tab, focus: String(Date.now()) } : {},
  });
}

export function navigateToManageRequests(rideId?: string) {
  if (navigationRef.isReady()) {
    navigationRef.navigate('DriverRequests', { rideId });
  }
}

export function navigateToEditCancelRide(rideId: string) {
  if (navigationRef.isReady()) {
    navigationRef.navigate('EditCancelRide', { rideId });
  }
}

export function navigateToProfile() {
  if (!navigationRef.isReady()) {
    return;
  }
  const role = getCurrentMockRole();
  if (role === 'rider') {
    navigationRef.navigate('RiderTabs', { screen: 'Profile' });
    return;
  }
  navigationRef.navigate('DriverTabs', { screen: 'Profile' });
}

export function navigateToNotifications() {
  if (!navigationRef.isReady()) {
    return;
  }
  navigationRef.navigate('Notifications');
}

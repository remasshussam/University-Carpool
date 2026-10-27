/**
 * Driver feature data layer for Phase 1.
 * Rides and requests stay in the local preview store for this session.
 */
import { getCurrentMockUser } from '@/features/auth/authApi';
import {
  previewAcceptRequest,
  previewCancelRide,
  previewCreateRide,
  previewDashboard,
  previewPendingGroups,
  previewProfile,
  previewRejectRequest,
  previewRequestsForRide,
  previewRideById,
  previewRides,
  previewUpdateRide,
} from '@/features/driver/previewData';
import type { Profile, Ride, RideRequest, RideRequestWithRider } from '@/lib/database.types';
import type {
  CreateRideInput,
  DriverApiResult,
  DriverDashboardStats,
  PendingRequestGroup,
  RideWithBookings,
  UpdateRideInput,
} from '@/features/driver/types';

function fail(error: string, code?: string): DriverApiResult<never> {
  return { ok: false, error, code };
}

export function isUpcomingActive(ride: Ride, now = new Date()): boolean {
  return ride.status === 'active' && new Date(ride.departure_time).getTime() > now.getTime();
}

export async function getDriverProfile(): Promise<DriverApiResult<Profile>> {
  const session = getCurrentMockUser();
  const profile = previewProfile();
  if (!session) {
    return { ok: true, data: profile };
  }

  return {
    ok: true,
    data: {
      ...profile,
      full_name: session.fullName,
      email: session.email,
      phone_number: session.phoneNumber,
    },
  };
}

export async function getDriverRides(): Promise<DriverApiResult<Ride[]>> {
  return { ok: true, data: previewRides() };
}

export async function getDriverDashboardStats(): Promise<DriverApiResult<DriverDashboardStats>> {
  return { ok: true, data: previewDashboard() };
}

export async function createRide(rideData: CreateRideInput): Promise<DriverApiResult<Ride>> {
  const driverId = getCurrentMockUser()?.id ?? 'preview-driver';
  return previewCreateRide(rideData, driverId);
}

export async function getRideById(rideId: string): Promise<DriverApiResult<RideWithBookings>> {
  const ride = previewRideById(rideId);
  return ride ? { ok: true, data: ride } : fail('Ride not found.');
}

export async function updateRide(rideId: string, updates: UpdateRideInput): Promise<DriverApiResult<Ride>> {
  return previewUpdateRide(rideId, updates);
}

export async function cancelRide(rideId: string): Promise<DriverApiResult<Ride>> {
  return previewCancelRide(rideId);
}

export async function getDriverPendingRequestGroups(): Promise<DriverApiResult<PendingRequestGroup[]>> {
  return { ok: true, data: previewPendingGroups() };
}

export async function getRideRequests(rideId: string): Promise<DriverApiResult<RideRequestWithRider[]>> {
  if (!previewRideById(rideId)) {
    return fail('Ride not found.');
  }

  return { ok: true, data: previewRequestsForRide(rideId) };
}

export async function acceptRideRequest(requestId: string): Promise<DriverApiResult<RideRequest>> {
  return previewAcceptRequest(requestId);
}

export async function rejectRideRequest(requestId: string): Promise<DriverApiResult<RideRequest>> {
  return previewRejectRequest(requestId);
}

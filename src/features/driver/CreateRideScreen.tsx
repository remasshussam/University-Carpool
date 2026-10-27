import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AppButton } from '@/components/AppButton';
import { showDialog } from '@/components/AppDialog';
import { AppInput } from '@/components/AppInput';
import { DateTimeField } from '@/features/driver/components/DateTimeField';
import { ScreenHeader } from '@/features/driver/components/ScreenHeader';
import { SeatCounter } from '@/features/driver/components/SeatCounter';
import { createRide } from '@/features/driver/driverApi';
import { combineDeparture, formatDateInput, formatTimeInput, hasFormErrors, parseFare, validateRideForm } from '@/features/driver/rideValidation';
import type { RideFormErrors, RideFormValues } from '@/features/driver/types';
import { navigateToMyRides } from '@/navigation/navigationRef';

function defaultDeparture(): Date {
  const next = new Date();
  next.setDate(next.getDate() + 1);
  next.setHours(8, 0, 0, 0);
  return next;
}

export default function CreateRideScreen() {
  const navigation = useNavigation();
  const initialDeparture = defaultDeparture();
  const [values, setValues] = useState<RideFormValues>({
    pickupPoint: '',
    dropoffPoint: '',
    departureDate: formatDateInput(initialDeparture),
    departureTime: formatTimeInput(initialDeparture),
    totalSeats: 3,
    fare: '',
  });
  const [errors, setErrors] = useState<RideFormErrors>({});
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof RideFormValues>(key: K, value: RideFormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const publish = async () => {
    if (saving) {
      return;
    }

    const nextErrors = validateRideForm(values);
    setErrors(nextErrors);
    if (hasFormErrors(nextErrors)) {
      return;
    }

    const departure = combineDeparture(values.departureDate, values.departureTime);
    if (!departure) {
      return;
    }

    setSaving(true);
    const result = await createRide({
      pickup_point: values.pickupPoint.trim(),
      dropoff_point: values.dropoffPoint.trim(),
      departure_time: departure.toISOString(),
      total_seats: values.totalSeats,
      fare: parseFare(values.fare),
    });
    setSaving(false);

    if (!result.ok) {
      showDialog({
        tone: 'error',
        title: 'Could not publish ride',
        message: result.error,
        primaryLabel: 'OK',
      });
      return;
    }

    showDialog({
      tone: 'success',
      title: 'Ride published',
      message: 'Your ride is now available for riders.',
      primaryLabel: 'View My Rides',
      dismissible: false,
      onPrimary: () => navigateToMyRides('upcoming'),
    });
  };

  return (
    <View className="flex-1 bg-[#F7F9FC]">
      <ScreenHeader title="Create Ride" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="px-5 py-5 pb-10">
          <Text className="mb-4 text-sm text-[#6B7280]">
            Fill in the trip details. Pickup, destination, and departure must all be set before publishing.
          </Text>

          <View className="gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-4">
            <AppInput
              label="Pickup Point"
              value={values.pickupPoint}
              onChangeText={(text) => update('pickupPoint', text)}
              placeholder="Nasr City"
              error={errors.pickupPoint}
            />
            <AppInput
              label="Drop-off Point"
              value={values.dropoffPoint}
              onChangeText={(text) => update('dropoffPoint', text)}
              placeholder="GIU University"
              error={errors.dropoffPoint}
            />
            <DateTimeField
              label="Departure Date"
              mode="date"
              value={values.departureDate}
              onChangeText={(text) => update('departureDate', text)}
              error={errors.departureDate}
            />
            <DateTimeField
              label="Departure Time"
              mode="time"
              value={values.departureTime}
              onChangeText={(text) => update('departureTime', text)}
              error={errors.departureTime}
            />
            <SeatCounter
              label="Available Seats"
              value={values.totalSeats}
              onChange={(next) => update('totalSeats', next)}
              error={errors.totalSeats}
            />
            <AppInput
              label="Fare per Seat (EGP)"
              value={values.fare}
              onChangeText={(text) => update('fare', text)}
              placeholder="50"
              keyboardType="decimal-pad"
              error={errors.fare}
            />
          </View>

          <View className="mt-6">
            <AppButton title="Publish Ride" onPress={() => void publish()} loading={saving} disabled={saving} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

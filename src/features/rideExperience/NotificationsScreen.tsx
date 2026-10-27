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
  'Notifications'
>;

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'New Ride Request',
    message: 'Ahmed wants to join your ride.',
    time: '25 min ago',
    icon: 'person-add',
    iconBg: 'bg-blue-500',
  },
  {
    id: '2',
    title: 'Ride Reminder',
    message: 'Your ride starts in 30 minutes.',
    time: '3 h ago',
    icon: 'time',
    iconBg: 'bg-orange-500',
  },
  {
    id: '3',
    title: 'Messages',
    message: 'View your ride conversations.',
    time: '',
    icon: 'chatbubble',
    iconBg: 'bg-purple-500',
  },
];

export default function NotificationsScreen({
  navigation,
}: Props) {
  const openNotification = (title: string) => {
    if (title === 'New Ride Request') {
      navigation.navigate('ManageRequests');
    }

    if (title === 'Ride Reminder') {
      navigation.navigate('UpcomingRide');
    }

    if (title === 'Messages') {
      navigation.navigate('ChatList');
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-slate-950 px-5 pb-5 pt-14">
        <View className="flex-row items-center">
          {/* Back Arrow */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
            className="mr-4 active:opacity-70"
          >
            <Ionicons
              name="arrow-back"
              size={26}
              color="white"
            />
          </Pressable>

          <Text className="text-3xl font-bold text-white">
            Notifications
          </Text>
        </View>
      </View>

      {/* Notification List */}
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-4 pt-4"
        renderItem={({ item }) => (
          <Pressable
            onPress={() => openNotification(item.title)}
            accessibilityRole="button"
            className="flex-row gap-4 border-b border-slate-200 py-4 active:opacity-70"
          >
            {/* Icon */}
            <View
              className={`h-12 w-12 items-center justify-center rounded-full ${item.iconBg}`}
            >
              <Ionicons
                name={item.icon as any}
                size={22}
                color="white"
              />
            </View>

            {/* Details */}
            <View className="flex-1">
              <View className="flex-row justify-between gap-2">
                <Text className="flex-1 text-base font-bold text-slate-900">
                  {item.title}
                </Text>

                {item.time !== '' && (
                  <Text className="text-xs text-slate-400">
                    {item.time}
                  </Text>
                )}
              </View>

              <Text className="mt-1 text-sm text-slate-500">
                {item.message}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
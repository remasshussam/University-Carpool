import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'ChatList'
>;

const CHATS = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    message: 'I am waiting at the main gate.',
    time: '10:30 AM',
    unread: 2,
    initials: 'AH',
  },
  {
    id: '2',
    name: 'Mariam Ali',
    message: 'Okay, see you at the pickup point.',
    time: '9:45 AM',
    unread: 0,
    initials: 'MA',
  },
  {
    id: '3',
    name: 'Omar Khaled',
    message: 'What time will you arrive?',
    time: 'Yesterday',
    unread: 1,
    initials: 'OK',
  },
  {
    id: '4',
    name: 'Sara Mohamed',
    message: 'Thank you for the ride!',
    time: 'Yesterday',
    unread: 0,
    initials: 'SM',
  },
];

export default function ChatListScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');

  const filteredChats = CHATS.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-white">
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

          <Text className="text-3xl font-bold text-white">
            Messages
          </Text>
        </View>
      </View>

      <View className="px-4 py-4">
        <View className="flex-row items-center rounded-xl bg-slate-100 px-4">
          <Ionicons
            name="search"
            size={20}
            color="#64748b"
          />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search conversations"
            placeholderTextColor="#94a3b8"
            className="flex-1 px-3 py-3 text-slate-900"
          />
        </View>
      </View>

      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-4"
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('Chat')}
            accessibilityRole="button"
            className="flex-row items-center border-b border-slate-200 py-4 active:opacity-70"
          >
            <View className="h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <Text className="text-base font-bold text-emerald-700">
                {item.initials}
              </Text>
            </View>

            <View className="ml-4 flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-bold text-slate-900">
                  {item.name}
                </Text>

                <Text className="text-xs text-slate-400">
                  {item.time}
                </Text>
              </View>

              <View className="mt-1 flex-row items-center">
                <Text
                  numberOfLines={1}
                  className="flex-1 text-sm text-slate-500"
                >
                  {item.message}
                </Text>

                {item.unread > 0 && (
                  <View className="ml-2 h-6 min-w-6 items-center justify-center rounded-full bg-emerald-600 px-1">
                    <Text className="text-xs font-bold text-white">
                      {item.unread}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
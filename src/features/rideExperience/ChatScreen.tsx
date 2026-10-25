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
  'Chat'
>;

const MESSAGES = [
  {
    id: '1',
    text: 'Hi, are we still meeting at the main gate?',
    time: '10:20 AM',
    sender: 'other',
  },
  {
    id: '2',
    text: 'Yes, I will be there in 10 minutes.',
    time: '10:22 AM',
    sender: 'me',
  },
  {
    id: '3',
    text: 'Great! I am waiting near the entrance.',
    time: '10:25 AM',
    sender: 'other',
  },
];

export default function ChatScreen({ navigation }: Props) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(MESSAGES);

  const sendMessage = () => {
    if (message.trim() === '') {
      return;
    }

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      time: 'Now',
      sender: 'me',
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <View className="flex-1 bg-slate-100">
      {/* Header */}
      <View className="bg-slate-950 px-5 pb-4 pt-14">
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

          {/* User */}
          <View className="h-11 w-11 items-center justify-center rounded-full bg-emerald-100">
            <Text className="font-bold text-emerald-700">
              AH
            </Text>
          </View>

          <View className="ml-3">
            <Text className="text-lg font-bold text-white">
              Ahmed Hassan
            </Text>

            <Text className="text-sm text-slate-400">
              Upcoming ride
            </Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerClassName="flex-grow justify-end px-4 py-4"
        renderItem={({ item }) => (
          <View
            className={`mb-3 max-w-[80%] rounded-2xl px-4 py-3 ${
              item.sender === 'me'
                ? 'self-end bg-emerald-600'
                : 'self-start bg-white'
            }`}
          >
            <Text
              className={
                item.sender === 'me'
                  ? 'text-white'
                  : 'text-slate-900'
              }
            >
              {item.text}
            </Text>

            <Text
              className={`mt-1 text-right text-xs ${
                item.sender === 'me'
                  ? 'text-emerald-100'
                  : 'text-slate-400'
              }`}
            >
              {item.time}
            </Text>
          </View>
        )}
      />

      {/* Message Input */}
      <View className="flex-row items-center border-t border-slate-200 bg-white px-4 pb-5 pt-3">
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="#94a3b8"
          className="mr-3 flex-1 rounded-full bg-slate-100 px-4 py-3 text-slate-900"
        />

        <Pressable
          onPress={sendMessage}
          accessibilityRole="button"
          className="h-12 w-12 items-center justify-center rounded-full bg-emerald-600 active:opacity-70"
        >
          <Ionicons
            name="send"
            size={20}
            color="white"
          />
        </Pressable>
      </View>
    </View>
  );
}
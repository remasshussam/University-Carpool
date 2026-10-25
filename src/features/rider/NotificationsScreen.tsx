import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onBackPress: () => void;
};

const demoNotifications = [
  {
    id: 1,
    title: "Ride Accepted",
    message: "Sara Ali accepted your request.",
    read: false,
  },
  {
    id: 2,
    title: "New Ride Available",
    message: "A new ride to GIU is available.",
    read: false,
  },
  {
    id: 3,
    title: "Ride Reminder",
    message: "Your ride is scheduled for 9:00 AM.",
    read: false,
  },
  {
    id: 4,
    title: "Request Submitted",
    message: "Your request was sent.",
    read: true,
  },
  {
    id: 5,
    title: "Welcome to Uni Carpool",
    message: "Find and share university rides.",
    read: true,
  },
];

type ChatMessage = {
  id: number;
  text: string;
  sender: "me" | "driver";
};

export default function NotificationsScreen({ onBackPress }: Props) {
  const [notifications, setNotifications] = useState(demoNotifications);
  const [tab, setTab] = useState("Unread");
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Hi, are we meeting at the main gate?", sender: "driver" },
    { id: 2, text: "Yes, I will be there in 10 minutes.", sender: "me" },
    { id: 3, text: "Great! See you there.", sender: "driver" },
  ]);

  const filtered = notifications.filter((n) =>
    tab === "Read" ? n.read : !n.read,
  );

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: message.trim(), sender: "me" },
    ]);
    setMessage("");
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-row items-center justify-between px-5 py-5">
        <Pressable
          onPress={tab === "Chat" ? () => setTab("Unread") : onBackPress}
        >
          <Ionicons name="arrow-back" size={24} color="#071E3B" />
        </Pressable>

        <Text className="text-lg font-bold text-[#071E3B]">
          {tab === "Chat" ? "Chat with Sara Ali" : "Notifications"}
        </Text>

        {tab === "Chat" ? (
          <Ionicons name="chatbubble-outline" size={22} color="#00A878" />
        ) : (
          <Pressable onPress={() => setNotifications([])}>
            <Text className="text-sm font-semibold text-[#00A878]">
              Clear all
            </Text>
          </Pressable>
        )}
      </View>

      <View className="flex-row border-b border-gray-100">
        {["Read", "Unread", "Chat"].map((item) => (
          <Pressable
            key={item}
            onPress={() => setTab(item)}
            className="flex-1 items-center pt-3"
          >
            <Text
              className={
                tab === item
                  ? "pb-3 font-bold text-[#071E3B]"
                  : "pb-3 text-gray-400"
              }
            >
              {item}
            </Text>
            <View
              className={
                tab === item
                  ? "h-[2px] w-full bg-[#00A878]"
                  : "h-[2px] w-full bg-transparent"
              }
            />
          </Pressable>
        ))}
      </View>

      {tab === "Chat" ? (
        <>
          <ScrollView className="flex-1 bg-[#F1F5F9] px-4">
            <Text className="my-4 text-center text-xs text-gray-400">
              Demo Conversation
            </Text>

            {messages.map((item) => (
              <View
                key={item.id}
                className={
                  item.sender === "me"
                    ? "mb-3 ml-12 self-end rounded-2xl bg-[#00A878] p-3"
                    : "mb-3 mr-12 self-start rounded-2xl bg-white p-3"
                }
              >
                <Text
                  className={
                    item.sender === "me" ? "text-white" : "text-[#071E3B]"
                  }
                >
                  {item.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View className="flex-row items-center border-t border-gray-100 bg-white px-4 py-3">
            <TextInput
              className="mr-3 h-12 flex-1 rounded-full bg-[#F1F5F9] px-4 text-[#071E3B]"
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
              returnKeyType="send"
              onSubmitEditing={sendMessage}
            />
            <Pressable
              onPress={sendMessage}
              className="h-12 w-12 items-center justify-center rounded-full bg-[#00A878]"
            >
              <Ionicons name="send" size={20} color="white" />
            </Pressable>
          </View>
        </>
      ) : (
        <ScrollView className="flex-1 px-5">
          {filtered.length === 0 ? (
            <View className="items-center pt-32">
              <Ionicons
                name="notifications-outline"
                size={60}
                color="#94A3B8"
              />
              <Text className="mt-4 font-bold text-[#071E3B]">
                No notifications yet!
              </Text>
              <Text className="mt-2 text-sm text-gray-400">
                Your ride updates will appear here.
              </Text>
            </View>
          ) : (
            filtered.map((item) => (
              <Pressable
                key={item.id}
                onPress={() =>
                  setNotifications((prev) =>
                    prev.map((n) =>
                      n.id === item.id ? { ...n, read: true } : n,
                    ),
                  )
                }
                className="flex-row items-center border-b border-gray-100 py-5"
              >
                <View className="mr-3 h-11 w-11 items-center justify-center rounded-xl bg-[#E6F7F0]">
                  <Ionicons
                    name="notifications-outline"
                    size={23}
                    color="#00A878"
                  />
                </View>

                <View className="flex-1">
                  <Text className="font-bold text-[#071E3B]">{item.title}</Text>
                  <Text className="mt-1 text-xs text-gray-500">
                    {item.message}
                  </Text>
                </View>

                {!item.read && (
                  <View className="ml-3 h-2 w-2 rounded-full bg-[#00A878]" />
                )}
              </Pressable>
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

import { useState, ComponentProps } from "react";
import { View, Text, ScrollView, Pressable, Switch, Modal, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { getSettings, updateSettings, deleteAccount, Settings } from "./profileApi";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;
type IconName = ComponentProps<typeof Ionicons>["name"];
type ModalType = "help" | "about" | "delete";

const TOGGLES: { key: keyof Settings; label: string; subtitle: string; icon: IconName }[] = [
  { key: "rideNotifications", label: "Ride updates", subtitle: "Requests, confirmations and cancellations", icon: "car-outline" },
  { key: "messageNotifications", label: "Messages", subtitle: "New chat messages from riders and drivers", icon: "chatbubble-outline" },
  { key: "showPhone", label: "Show my phone number", subtitle: "Let people in your rides call you", icon: "call-outline" },
];

const MODALS: Record<ModalType, { icon: IconName; circle: string; title: string; message: string }> = {
  help: {
    icon: "information",
    circle: "bg-blue-500",
    title: "Help & Support",
    message: "Email us at support@unicarpool.app and we will reply within 24 hours.",
  },
  about: {
    icon: "car",
    circle: "bg-navy",
    title: "Uni Carpool",
    message: "Version 1.0.0\nShare rides with students from your university.",
  },
  delete: {
    icon: "trash",
    circle: "bg-red-500",
    title: "Delete Account?",
    message: "This will permanently remove your profile, ride history and ratings. This cannot be undone.",
  },
};

export default function SettingsScreen({ navigation }: Props) {
  const [settings, setSettings] = useState(getSettings());
  const [modal, setModal] = useState<ModalType | null>(null);
  const [confirmText, setConfirmText] = useState("");

  const canDelete = confirmText.trim() === "DELETE";

  function toggle(key: keyof Settings) {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    updateSettings(updated);
  }

  function closeModal() {
    setModal(null);
    setConfirmText("");
  }

  function handleDelete() {
    if (!canDelete) return;
    deleteAccount();
    closeModal();
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  }

  return (
    <ScrollView contentContainerClassName="p-4 pb-8">
      <Text className="text-xs font-semibold text-gray-500 uppercase mb-2 ml-1">Notifications & privacy</Text>
      <View className="bg-white rounded-2xl px-4">
        {TOGGLES.map((item, index) => (
          <View
            key={item.key}
            className={`flex-row items-center py-4 ${index < TOGGLES.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <View className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center">
              <Ionicons name={item.icon} size={20} color="#0B3C4D" />
            </View>
            <View className="flex-1 ml-3 mr-2">
              <Text className="text-base font-semibold text-gray-900">{item.label}</Text>
              <Text className="text-xs text-gray-500">{item.subtitle}</Text>
            </View>
            <Switch
              value={settings[item.key]}
              onValueChange={() => toggle(item.key)}
              trackColor={{ false: "#D1D5DB", true: "#1A9A4A" }}
              thumbColor="#FFFFFF"
            />
          </View>
        ))}
      </View>

      <Text className="text-xs font-semibold text-gray-500 uppercase mb-2 ml-1 mt-5">Account</Text>
      <View className="bg-white rounded-2xl px-4">
        <Pressable
          className="flex-row items-center py-4 border-b border-gray-100 active:opacity-70"
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <View className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center">
            <Ionicons name="lock-closed-outline" size={20} color="#2563EB" />
          </View>
          <Text className="flex-1 text-base font-semibold text-gray-900 ml-3">Change Password</Text>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </Pressable>

        <Pressable
          className="flex-row items-center py-4 border-b border-gray-100 active:opacity-70"
          onPress={() => setModal("help")}
        >
          <View className="w-10 h-10 rounded-xl bg-green-50 items-center justify-center">
            <Ionicons name="help-circle-outline" size={20} color="#1A9A4A" />
          </View>
          <Text className="flex-1 text-base font-semibold text-gray-900 ml-3">Help & Support</Text>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </Pressable>

        <Pressable className="flex-row items-center py-4 active:opacity-70" onPress={() => setModal("about")}>
          <View className="w-10 h-10 rounded-xl bg-yellow-50 items-center justify-center">
            <Ionicons name="information-circle-outline" size={20} color="#F5B301" />
          </View>
          <Text className="flex-1 text-base font-semibold text-gray-900 ml-3">About</Text>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </Pressable>
      </View>

      <Text className="text-xs font-semibold text-red-500 uppercase mb-2 ml-1 mt-5">Danger zone</Text>
      <Pressable
        className="flex-row items-center bg-white rounded-2xl px-4 py-4 border border-red-100 active:opacity-70"
        onPress={() => setModal("delete")}
      >
        <View className="w-10 h-10 rounded-xl bg-red-50 items-center justify-center">
          <Ionicons name="trash-outline" size={20} color="#E53935" />
        </View>
        <View className="flex-1 ml-3">
          <Text className="text-base font-semibold text-red-600">Delete Account</Text>
          <Text className="text-xs text-gray-500">Permanently remove your account and data</Text>
        </View>
      </Pressable>

      <Modal visible={modal !== null} transparent animationType="fade" onRequestClose={closeModal}>
        <View className="flex-1 bg-black/40 items-center justify-center px-8">
          {modal ? (
            <View className="bg-white rounded-3xl px-6 py-7 w-full items-center">
              <View className={`w-14 h-14 rounded-full items-center justify-center mb-4 ${MODALS[modal].circle}`}>
                <Ionicons name={MODALS[modal].icon} size={28} color="#FFFFFF" />
              </View>
              <Text className="text-lg font-bold text-navy text-center">{MODALS[modal].title}</Text>
              <Text className="text-sm text-gray-500 text-center mt-2">{MODALS[modal].message}</Text>

              {modal === "delete" ? (
                <>
                  <Text className="text-sm text-gray-700 text-center mt-5 mb-2">
                    Type <Text className="font-bold text-red-600">DELETE</Text> to confirm
                  </Text>
                  <TextInput
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base text-center text-gray-900"
                    value={confirmText}
                    onChangeText={setConfirmText}
                    autoCapitalize="characters"
                    placeholder="DELETE"
                    placeholderTextColor="#D1D5DB"
                  />
                  <View className="flex-row w-full mt-5">
                    <Pressable className="flex-1 bg-gray-100 rounded-2xl py-3 items-center mr-2 active:opacity-70" onPress={closeModal}>
                      <Text className="text-base font-semibold text-gray-700">Cancel</Text>
                    </Pressable>
                    <Pressable
                      className={`flex-1 bg-red-500 rounded-2xl py-3 items-center active:opacity-70 ${canDelete ? "" : "opacity-40"}`}
                      onPress={handleDelete}
                      disabled={!canDelete}
                    >
                      <Text className="text-base font-semibold text-white">Delete</Text>
                    </Pressable>
                  </View>
                </>
              ) : (
                <Pressable className="w-full bg-primary rounded-2xl py-3 items-center mt-6 active:opacity-70" onPress={closeModal}>
                  <Text className="text-base font-semibold text-white">Got it</Text>
                </Pressable>
              )}
            </View>
          ) : null}
        </View>
      </Modal>
    </ScrollView>
  );
}
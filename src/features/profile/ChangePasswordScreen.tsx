import { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";
import AppInput from "@/components/AppInput";
import AppButton from "@/components/AppButton";
import { isCurrentPassword, changePassword } from "./profileApi";

type Props = NativeStackScreenProps<RootStackParamList, "ChangePassword">;
type Field = "current" | "next" | "confirm";

export default function ChangePasswordScreen({ navigation }: Props) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  const rules = [
    { label: "At least 8 characters", met: next.length >= 8 },
    { label: "Contains a number", met: /\d/.test(next) },
    { label: "Different from your current password", met: next.length > 0 && next !== current },
  ];

  function handleSave() {
    const newErrors: Partial<Record<Field, string>> = {};
    if (!current) newErrors.current = "Enter your current password";
    else if (!isCurrentPassword(current)) newErrors.current = "Current password is incorrect";
    if (!rules.every((rule) => rule.met)) newErrors.next = "New password does not meet the rules below";
    if (confirm !== next) newErrors.confirm = "Passwords do not match";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    changePassword(next);
    Alert.alert("Password changed", "Use your new password next time you log in.", [
      { text: "Done", onPress: () => navigation.goBack() },
    ]);
  }

  return (
    <ScrollView contentContainerClassName="p-4 pb-8" keyboardShouldPersistTaps="handled">
      <View className="bg-white rounded-2xl p-4">
        <AppInput label="Current Password" value={current} onChangeText={setCurrent} error={errors.current} secureTextEntry={!show} placeholder="Enter current password" />
        <AppInput label="New Password" value={next} onChangeText={setNext} error={errors.next} secureTextEntry={!show} placeholder="Enter new password" />
        <AppInput label="Confirm New Password" value={confirm} onChangeText={setConfirm} error={errors.confirm} secureTextEntry={!show} placeholder="Repeat new password" />

        <Pressable className="flex-row items-center active:opacity-70" onPress={() => setShow(!show)}>
          <Ionicons name={show ? "eye-off-outline" : "eye-outline"} size={18} color="#0B3C4D" />
          <Text className="text-sm text-navy font-semibold ml-2">{show ? "Hide passwords" : "Show passwords"}</Text>
        </Pressable>
      </View>

      <View className="bg-white rounded-2xl p-4 mt-3">
        <Text className="text-sm font-semibold text-gray-900 mb-2">Your new password must have:</Text>
        {rules.map((rule) => (
          <View key={rule.label} className="flex-row items-center mt-1">
            <Ionicons name={rule.met ? "checkmark-circle" : "ellipse-outline"} size={18} color={rule.met ? "#1A9A4A" : "#9CA3AF"} />
            <Text className={`text-sm ml-2 ${rule.met ? "text-green-700" : "text-gray-500"}`}>{rule.label}</Text>
          </View>
        ))}
      </View>

      <View className="mt-4">
        <AppButton title="Update Password" onPress={handleSave} />
      </View>
    </ScrollView>
  );
}
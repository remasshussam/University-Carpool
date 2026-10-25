import { useState } from "react";
import { View, Text, ScrollView, Pressable, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";
import AppInput from "@/components/AppInput";
import AppButton from "@/components/AppButton";
import { getUser, updateUser } from "./profileApi";

type Props = NativeStackScreenProps<RootStackParamList, "EditProfile">;
type Field = "name" | "email" | "phone" | "faculty";
type PopupType = "saved" | "discard";

const BIO_MAX = 150;

export default function EditProfileScreen({ navigation }: Props) {
  const [original] = useState(getUser());
  const [name, setName] = useState(original.name);
  const [email, setEmail] = useState(original.email);
  const [phone, setPhone] = useState(original.phone);
  const [faculty, setFaculty] = useState(original.faculty);
  const [bio, setBio] = useState(original.bio);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [popup, setPopup] = useState<PopupType | null>(null);

  const hasChanges =
    name !== original.name ||
    email !== original.email ||
    phone !== original.phone ||
    faculty !== original.faculty ||
    bio !== original.bio;

  function handleSave() {
    const newErrors: Partial<Record<Field, string>> = {};
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!email.trim().endsWith("@bue.edu.eg")) newErrors.email = "Use your BUE email (name@bue.edu.eg)";
    if (phone.trim().length !== 11 || !phone.trim().startsWith("01")) newErrors.phone = "Phone must be 11 digits and start with 01";
    if (!faculty.trim()) newErrors.faculty = "Faculty is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    updateUser({ name: name.trim(), email: email.trim(), phone: phone.trim(), faculty: faculty.trim(), bio: bio.trim() });
    setPopup("saved");
  }

  function handleCancel() {
    if (!hasChanges) {
      navigation.goBack();
      return;
    }
    setPopup("discard");
  }

  function leaveScreen() {
    setPopup(null);
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerClassName="p-4 pb-8" keyboardShouldPersistTaps="handled">
      <View className="flex-row items-center bg-blue-50 rounded-2xl p-4 mb-3">
        <Ionicons name="information-circle-outline" size={22} color="#2563EB" />
        <Text className="flex-1 text-sm text-blue-800 ml-2">
          Keep your details up to date so drivers and riders can reach you.
        </Text>
      </View>

      <View className="bg-white rounded-2xl p-4">
        <AppInput label="Full Name" value={name} onChangeText={setName} error={errors.name} placeholder="Enter your full name" />
        <AppInput label="University Email" value={email} onChangeText={setEmail} error={errors.email} autoCapitalize="none" keyboardType="email-address" placeholder="name@bue.edu.eg" />
        <AppInput label="Phone Number" value={phone} onChangeText={setPhone} error={errors.phone} keyboardType="phone-pad" maxLength={11} placeholder="01XXXXXXXXX" />
        <AppInput label="Faculty" value={faculty} onChangeText={setFaculty} error={errors.faculty} placeholder="Your faculty" />
        <AppInput
          label="About me (optional)"
          value={bio}
          onChangeText={setBio}
          multiline
          maxLength={BIO_MAX}
          placeholder="Tell others a little about yourself"
          style={{ minHeight: 90, textAlignVertical: "top" }}
        />
        <Text className="text-xs text-gray-400 text-right -mt-2">
          {bio.length}/{BIO_MAX}
        </Text>
      </View>

      <View className="mt-4 mb-3">
        <AppButton title="Save Changes" onPress={handleSave} />
      </View>
      <AppButton title="Cancel" variant="outline" onPress={handleCancel} />

      <Modal visible={popup !== null} transparent animationType="fade" onRequestClose={() => setPopup(null)}>
        <View className="flex-1 bg-black/40 items-center justify-center px-8">
          <View className="bg-white rounded-3xl px-6 py-7 w-full items-center">
            <View
              className={`w-14 h-14 rounded-full items-center justify-center mb-4 ${popup === "saved" ? "bg-primary" : "bg-red-500"}`}
            >
              <Ionicons name={popup === "saved" ? "checkmark" : "alert"} size={28} color="#FFFFFF" />
            </View>
            <Text className="text-lg font-bold text-navy text-center">
              {popup === "saved" ? "Profile Updated" : "Discard Changes?"}
            </Text>
            <Text className="text-sm text-gray-500 text-center mt-2">
              {popup === "saved" ? "Your changes have been saved." : "Your edits will not be saved."}
            </Text>

            {popup === "saved" ? (
              <Pressable className="w-full bg-primary rounded-2xl py-3 items-center mt-6 active:opacity-70" onPress={leaveScreen}>
                <Text className="text-base font-semibold text-white">Done</Text>
              </Pressable>
            ) : (
              <View className="flex-row w-full mt-6">
                <Pressable
                  className="flex-1 bg-gray-100 rounded-2xl py-3 items-center mr-2 active:opacity-70"
                  onPress={() => setPopup(null)}
                >
                  <Text className="text-base font-semibold text-gray-700">Keep Editing</Text>
                </Pressable>
                <Pressable className="flex-1 bg-red-500 rounded-2xl py-3 items-center active:opacity-70" onPress={leaveScreen}>
                  <Text className="text-base font-semibold text-white">Discard</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
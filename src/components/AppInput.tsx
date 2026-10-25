import { View, Text, TextInput, TextInputProps } from "react-native";

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export default function AppInput({ label, error, ...props }: Props) {
  return (
    <View className="mb-4">
      <Text className="text-sm text-gray-600 mb-1">{label}</Text>
      <TextInput
        className={`bg-white rounded-xl px-4 py-3 text-base text-gray-900 border ${error ? "border-red-500" : "border-gray-200"}`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error ? <Text className="text-xs text-red-600 mt-1">{error}</Text> : null}
    </View>
  );
}
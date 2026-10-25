import { Pressable, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "danger" | "outline";
  disabled?: boolean;
};

export default function AppButton({ title, onPress, variant = "primary", disabled = false }: Props) {
  const box = {
    primary: "bg-primary",
    danger: "bg-red-100",
    outline: "bg-white border border-primary",
  };
  const text = {
    primary: "text-white",
    danger: "text-red-600",
    outline: "text-primary",
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className={`rounded-xl p-4 items-center active:opacity-70 ${box[variant]} ${disabled ? "opacity-40" : ""}`}
    >
      <Text className={`text-base font-semibold ${text[variant]}`}>{title}</Text>
    </Pressable>
  );
}
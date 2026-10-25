import { View, Text, Pressable } from "react-native";

type Props = {
  from: string;
  to: string;
  date: string;
  time: string;
  info?: string;
  status?: string;
  action?: string;
  onPress?: () => void;
};

export default function RideCard({ from, to, date, time, info, status, action, onPress }: Props) {
  const statusColor = status === "Canceled" ? "text-red-600" : "text-green-700";

  return (
    <Pressable className="bg-white rounded-2xl p-4 mb-3" onPress={onPress} disabled={!onPress}>
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-bold text-gray-900 flex-1">
          {from} → {to}
        </Text>
        {status ? <Text className={`text-xs font-semibold ${statusColor}`}>{status}</Text> : null}
      </View>
      <Text className="text-sm text-gray-500 mt-1">
        {date} · {time}
      </Text>
      {info || action ? (
        <View className="flex-row justify-between mt-2">
          <Text className="text-sm text-gray-700">{info}</Text>
          {action ? <Text className="text-sm font-semibold text-primary">{action}</Text> : null}
        </View>
      ) : null}
    </Pressable>
  );
}
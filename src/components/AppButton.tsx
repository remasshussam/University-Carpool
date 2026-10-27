import { ActivityIndicator, Pressable, Text } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'dangerOutline' | 'ghost';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  className?: string;
};

const containerStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#00A878]',
  secondary: 'bg-[#14213D]',
  danger: 'bg-[#EF4444]',
  dangerOutline: 'border border-[#EF4444] bg-white',
  ghost: 'border border-[#E5E7EB] bg-white',
};

const labelStyles: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-white',
  danger: 'text-white',
  dangerOutline: 'text-[#EF4444]',
  ghost: 'text-[#14213D]',
};

export function AppButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  className = '',
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      className={`rounded-xl px-4 py-3.5 ${containerStyles[variant]} ${
        isDisabled ? 'opacity-50' : 'active:opacity-80'
      } ${className}`}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'dangerOutline' || variant === 'ghost' ? '#14213D' : '#FFFFFF'}
        />
      ) : (
        <Text className={`text-center text-base font-semibold ${labelStyles[variant]}`}>{title}</Text>
      )}
    </Pressable>
  );
}

type ProfileButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'danger' | 'outline';
  disabled?: boolean;
};

export default function ProfileAppButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}: ProfileButtonProps) {
  const box = {
    primary: 'bg-primary',
    danger: 'bg-red-100',
    outline: 'bg-white border border-primary',
  };
  const text = {
    primary: 'text-white',
    danger: 'text-red-600',
    outline: 'text-primary',
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className={`items-center rounded-xl p-4 active:opacity-70 ${box[variant]} ${disabled ? 'opacity-40' : ''}`}>
      <Text className={`text-base font-semibold ${text[variant]}`}>{title}</Text>
    </Pressable>
  );
}

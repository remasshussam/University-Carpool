import { AppInput } from '@/components/AppInput';

type DateTimeFieldProps = {
  label: string;
  mode: 'date' | 'time';
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  appearance?: 'outline' | 'soft';
  icon?: 'calendar-outline' | 'time-outline';
  editable?: boolean;
};

export function DateTimeField({
  label,
  mode,
  value,
  onChangeText,
  error,
  appearance = 'outline',
  icon,
  editable = true,
}: DateTimeFieldProps) {
  return (
    <AppInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      placeholder={mode === 'date' ? 'YYYY-MM-DD' : '8:00 AM'}
      error={error}
      appearance={appearance}
      icon={icon}
      editable={editable}
      autoCapitalize="none"
      keyboardType={mode === 'date' ? 'numbers-and-punctuation' : 'default'}
    />
  );
}

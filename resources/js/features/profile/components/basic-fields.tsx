import { subYears } from 'date-fns';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PrivacyTooltip } from './privacy-tooltip';

type BasicFieldsProps = {
  name: string;
  dateOfBirth: string;
  errors: {
    name?: string;
    date_of_birth?: string;
  };
  processing: boolean;
  calendarOpen: boolean;
  onCalendarOpenChange: (open: boolean) => void;
  maxDateOfBirth: string | null;
  onNameChange: (value: string) => void;
  onDateOfBirthChange: (value: string) => void;
};

function BasicFields({
  name,
  dateOfBirth,
  errors,
  processing,
  maxDateOfBirth,
  onNameChange,
  onDateOfBirthChange,
}: BasicFieldsProps) {
  const selectedBirthDate = dateOfBirth ? new Date(dateOfBirth) : undefined;
  const maximumBirthDate = maxDateOfBirth
    ? new Date(maxDateOfBirth)
    : subYears(new Date(), 18);
  const defaultBirthMonth = selectedBirthDate ?? maximumBirthDate;

  return (
    <FieldGroup>
      <Field data-invalid={Boolean(errors.name)}>
        <FieldLabel htmlFor="name">Nama Lengkap</FieldLabel>
        <Input
          id="name"
          placeholder="Masukkan nama lengkap Anda"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          aria-invalid={Boolean(errors.name)}
          disabled={processing}
          mobileLarge
        />
        <FieldError>{errors.name}</FieldError>
      </Field>

      <Field data-invalid={Boolean(errors.date_of_birth)}>
        <div className="flex items-center gap-1">
          <FieldLabel htmlFor="date_of_birth">Tanggal lahir</FieldLabel>
          <PrivacyTooltip />
        </div>
        <DatePicker
          id="date_of_birth"
          value={dateOfBirth}
          onChange={onDateOfBirthChange}
          disabled={processing}
          maxDate={maximumBirthDate}
          captionLayout="dropdown"
          defaultMonth={defaultBirthMonth}
          placeholder="Pilih tanggal lahir"
          mobileLarge
        />
        <FieldError>{errors.date_of_birth}</FieldError>
      </Field>
    </FieldGroup>
  );
}

export { BasicFields };


import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { AppPage, AppPageCard } from '@/components/layout/app-page';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import type { ProfileForm, ProfilePageProps } from '@/features/profile/types';
import app from '@/routes/app';
import { useAvatarSelection } from '../hooks/use-avatar-selection';
import { AvatarActions } from './avatar-actions';
import { BasicFields } from './basic-fields';
import { ProfileHeader } from './profile-header';

export function ProfilePage({
  profile,
  is_owner,
  has_custom_avatar,
  max_date_of_birth,
}: ProfilePageProps) {
  const [editing, setEditing] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const form = useForm<ProfileForm>({
    name: profile.name,
    date_of_birth: profile.date_of_birth ?? '',
    avatar: null,
    remove_avatar: false,
  });

  const existingAvatarUrl =
    has_custom_avatar && !form.data.remove_avatar
      ? profile.avatar_url
      : undefined;

  const avatarSelection = useAvatarSelection({
    existingUrl: existingAvatarUrl,
    onFileChange: (avatar) =>
      form.setData((data) => ({ ...data, avatar, remove_avatar: false })),
  });

  const resetForm = () => {
    form.setData({
      name: profile.name,
      date_of_birth: profile.date_of_birth ?? '',
      avatar: null,
      remove_avatar: false,
    });
    form.clearErrors();
    avatarSelection.clearSelection();
  };

  const cancel = () => {
    resetForm();
    setEditing(false);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    form.transform((data) => ({ ...data, _method: 'put' }));
    form.post(app.profile.update.url(), {
      forceFormData: true,
      onSuccess: () => {
        form.setData((data) => ({
          ...data,
          avatar: null,
          remove_avatar: false,
        }));
        avatarSelection.clearSelection();
        setEditing(false);
      },
    });
  };

  const removeAvatar = () => {
    if (form.data.avatar !== null) {
      form.setData('avatar', null);
      avatarSelection.clearSelection();

      return;
    }

    if (has_custom_avatar) {
      form.setData('remove_avatar', true);
    }
  };

  return (
    <TooltipProvider>
      <AppPage>
        <form onSubmit={submit} className="flex w-full flex-col gap-6">
          <AppPageCard className="relative flex flex-col gap-5">
            <ProfileHeader
              profile={profile}
              avatarUrl={avatarSelection.displayedUrl}
              isOwner={is_owner}
              editing={editing}
              onEdit={() => setEditing(true)}
            />

            {is_owner && editing && (
              <AvatarActions
                fileInputRef={avatarSelection.inputRef}
                processing={form.processing || avatarSelection.isProcessing}
                hasAvatar={Boolean(avatarSelection.displayedUrl)}
                canRemove={
                  form.data.avatar !== null ||
                  (has_custom_avatar && !form.data.remove_avatar)
                }
                onSelect={avatarSelection.handleFileChange}
                onRemove={removeAvatar}
                selectionError={avatarSelection.selectionError}
              />
            )}

            {editing && (
              <BasicFields
                name={form.data.name}
                dateOfBirth={form.data.date_of_birth}
                errors={{
                  name: form.errors.name,
                  date_of_birth: form.errors.date_of_birth,
                }}
                processing={form.processing}
                calendarOpen={calendarOpen}
                onCalendarOpenChange={setCalendarOpen}
                maxDateOfBirth={max_date_of_birth}
                onNameChange={(value) => form.setData('name', value)}
                onDateOfBirthChange={(value) =>
                  form.setData('date_of_birth', value)
                }
              />
            )}
          </AppPageCard>

          {editing && (
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                mobileLarge
                className="w-full sm:w-auto"
                onClick={cancel}
                disabled={form.processing}
              >
                Batal
              </Button>
              <Button
                type="submit"
                mobileLarge
                className="w-full sm:w-auto"
                disabled={form.processing}
              >
                {form.processing ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          )}
        </form>
      </AppPage>
    </TooltipProvider>
  );
}


export type Profile = {
  id: number;
  name: string;
  avatar_url: string;
  role?: string | null;
  email?: string;
  date_of_birth?: string | null;
};

export type ProfileForm = {
  name: string;
  date_of_birth: string;
  avatar: File | null;
  remove_avatar: boolean;
};

export type ProfilePageProps = {
  profile: Profile;
  is_owner: boolean;
  has_custom_avatar: boolean;
  max_date_of_birth: string | null;
};


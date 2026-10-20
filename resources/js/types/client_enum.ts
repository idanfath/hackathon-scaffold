export const CompressionProfiles = {
  ProfilePicture: {
    maxWidthOrHeight: 512,
    maxSizeMB: 1,
    useWebWorker: true,
    preserveExif: false,
  },
} as const;

export type CompressionProfile =
  (typeof CompressionProfiles)[keyof typeof CompressionProfiles];
export type CompressionProfileType = CompressionProfile;

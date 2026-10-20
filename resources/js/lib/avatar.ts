export const AVATAR_PALETTE: readonly [string, string][] = [
  ['#0052c9', '#fff'],
  ['#1f2937', '#fff'],
  ['#2a2622', '#fff'],
  ['#0f766e', '#fff'],
  ['#b45309', '#fff'],
  ['#ff8a00', '#2a2622'],
] as const;

export function hashName(name: string): number {
  let h = 2166136261;
  const encoded = new TextEncoder().encode(name);
  for (let i = 0; i < encoded.length; i++) {
    h = Math.imul(h ^ encoded[i], 16777619) >>> 0;
  }
  return h;
}

export type AvatarData = {
  initials: string;
  bg: string;
  fg: string;
};

export function getAvatarData(name: string = ''): AvatarData | null {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const initials = words.length
    ? (words[0][0] + (words[1] ? words.at(-1)![0] : '')).toUpperCase()
    : '';

  if (!/^[\p{L}\p{N}]/u.test(initials)) {
    return null;
  }

  const [bg, fg] = AVATAR_PALETTE[hashName(name) % AVATAR_PALETTE.length];

  return { initials, bg, fg };
}

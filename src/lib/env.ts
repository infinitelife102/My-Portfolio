/**
 * Profile and contact config from environment variables only.
 * No default values — set all in .env (see .env.example). Safe to commit; no personal data.
 */
export const env = {
  profileName: (import.meta.env.VITE_PROFILE_NAME as string) ?? '',
  profileEmail: (import.meta.env.VITE_PROFILE_EMAIL as string) ?? '',
  profileLocation: (import.meta.env.VITE_PROFILE_LOCATION as string) ?? '',
  profileBirthday: (import.meta.env.VITE_PROFILE_BIRTHDAY as string) ?? '',
  discord: (import.meta.env.VITE_DISCORD as string) ?? '',
  whatsapp: (import.meta.env.VITE_WHATSAPP as string) ?? '',
  formspreeId: (import.meta.env.VITE_FORMSPREE_ID as string) ?? '',
} as const;

export function getProfileInitials(): string {
  const name = env.profileName.trim();
  if (!name) return '';
  const parts = name.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

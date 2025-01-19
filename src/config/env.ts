interface EnvConfig {
  MXTOOLBOX_API_KEY: string;
  API_BASE_URL: string | undefined;
}

export const env: EnvConfig = {
  MXTOOLBOX_API_KEY: import.meta.env.VITE_MXTOOLBOX_API_KEY || '',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
};
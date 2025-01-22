/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROFILE_NAME?: string;
  readonly VITE_PROFILE_EMAIL?: string;
  readonly VITE_PROFILE_LOCATION?: string;
  readonly VITE_PROFILE_BIRTHDAY?: string;
  readonly VITE_DISCORD?: string;
  readonly VITE_WHATSAPP?: string;
  readonly VITE_FORMSPREE_ID?: string;
}

declare module '*.pdf?url' {
  const url: string;
  export default url;
}

declare module '*.svg?url' {
  const url: string;
  export default url;
}

declare module '*.png' {
  const url: string;
  export default url;
}

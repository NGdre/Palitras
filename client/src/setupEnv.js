const env = process.env;

export const websiteName = env.websiteName || "Palitras";
export const websiteDomain = env.websiteDomain || `${websiteName}.com`;
export const api = env.api || "/api";
export const maxPasswordLength = env.maxPasswordLength || 20;
export const minPasswordLength = env.minPasswordLength || 4;
export const maxImageUploadSize = env.maxImageUploadSize || 15;

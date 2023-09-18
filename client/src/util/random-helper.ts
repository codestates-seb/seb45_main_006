export const getRandomID = (): string => String(new Date().getTime());
export const getRandomIDNotTracing = (): string => Math.random().toString(36).substring(2, 10);

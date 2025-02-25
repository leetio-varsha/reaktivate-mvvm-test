export const generateUniqueId = (): string => {
  return `id_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
};

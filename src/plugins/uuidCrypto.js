import { v4 as uuidv4 } from 'uuid';

export const randomUuid = () => {
  const uuidvRandom = uuidv4();
  return uuidvRandom;
};
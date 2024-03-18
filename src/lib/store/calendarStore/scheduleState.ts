import { Schedule } from 'lib/types/Schedule';
import { atom } from 'recoil';

export const scheduleState = atom({
  key: 'scheduleState',
  default: [] as Schedule[] | [],
});

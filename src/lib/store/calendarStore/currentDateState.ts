import { returnToday } from 'lib/util/formatDate';
import { atom } from 'recoil';

export const currentDateState = atom({
  key: 'currentDateState',
  default: returnToday(),
});

import { returnToday } from 'lib/util/formatDate';
import { atom, selector } from 'recoil';

export const selectedDateState = atom({
  key: 'selectedDateState',
  default: returnToday(),
});

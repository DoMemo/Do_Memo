import { PICKER_COLOR } from 'lib/enum/PickerColor';

export interface Schedule {
  id: string;
  title: string | undefined;
  text: string;
  color: PICKER_COLOR | undefined;
  type: string;
  date: string;
  link: {
    type: string;
    id: string | undefined;
  };
  createAt: string;
  updateAt: string;
}
export interface CreateSchedule {
  title: string | undefined;
  text: string;
  color: PICKER_COLOR | undefined;
  type: string;
  date: string;
  link: {
    type: string;
    id: string | undefined;
  };
  createAt: string;
  updateAt: string;
}

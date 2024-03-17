export interface Schedule {
  id: string;
  title: string;
  text: string;
  color: string | undefined;
  type: string;
  date: string;
  link: {
    type: string;
    id: string;
  }[];
}

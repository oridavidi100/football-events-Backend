export interface Event {
  _id: string;
  location: string;
  Players: string[];
  date: Date;
  creator: Creator;
  img: string;
  adress: string;
  balls: string[];
}
interface Creator {
  fullName: string;
  id: string;
}

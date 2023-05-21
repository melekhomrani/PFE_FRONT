import User from "./User";
import Progress from './EnumProgress';
import Type from "./Type";

export default interface Reclamation {
  id: number,
  subject: string,
  description: string,
  author: User,
  progress: Progress,
  type: Type,
  dateCreation: Date
  dateUpdate: Date
}
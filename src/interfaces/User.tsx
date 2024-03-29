import Role from './Role';

export default interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

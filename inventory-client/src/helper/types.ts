
export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  photo: string;
  password?: string; // Only present in creation, not in responses
  createDate?: string;
  id?: string; // Some APIs duplicate _id as id
}
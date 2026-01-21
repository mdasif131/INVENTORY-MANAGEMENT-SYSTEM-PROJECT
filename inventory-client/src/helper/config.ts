import { getToken } from "./sessionHelper";

export const BaseURL = 'https://inventory-management-system-backend-asif.vercel.app/api/v1';
export const AxiosHeader = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
};
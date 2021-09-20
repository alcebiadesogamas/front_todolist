import { AxiosResponse } from 'axios';

export class ApiError extends Error {
  constructor(response: AxiosResponse) {
    super(response.data);
  }
}

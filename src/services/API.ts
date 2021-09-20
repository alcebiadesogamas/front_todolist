import axios from 'axios';

export class API {
  private apiUrl = process.env.REACT_APP_API_URL;

  get ApiInstance() {
    return axios.create({ baseURL: this.apiUrl });
  }
}

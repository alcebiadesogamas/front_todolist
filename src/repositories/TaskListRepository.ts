import { AbstractRepository } from './AbstractRepository';
import { ApiError } from '../services/ApiError';
import { AxiosResponse } from 'axios';

export class TaskListRepository extends AbstractRepository {
  private readonly endPoint: string = '/todo-lists';

  async create(name: string, createdAt: String) {
    let response: AxiosResponse;
    try {
      response = await this.api.post(this.endPoint, {
        name,
        created_at: createdAt,
      });
      return {
        error: false,
        ...response,
      };
    } catch (e) {
      throw new ApiError(response!);
    }
  }

  async listAll() {
    let response: AxiosResponse;
    try {
      response = await this.api.get(this.endPoint);
      return {
        error: false,
        ...response,
      };
    } catch (e) {
      throw new ApiError(response!);
    }
  }
}

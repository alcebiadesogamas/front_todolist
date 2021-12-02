import { AbstractRepository } from './AbstractRepository';
import { ApiError } from '../services/ApiError';
import { AxiosResponse } from 'axios';

interface CreateParams {
  description: string;
  toDoListId: number;
}

interface UpdateParams extends CreateParams {
  taskId: number;
  status: boolean;
}
export class TaskRepository extends AbstractRepository {
  private readonly endPoint: string = 'task/';
  async create({
    description,
    toDoListId,
  }: CreateParams) {
    let response: AxiosResponse;
    try {
      response = await this.api.post(this.endPoint, {
        description,
        status: false,
        toDoListId,
      });
      return {
        error: false,
        ...response,
      };
    } catch (e) {
      throw new ApiError(response!);
    }
  }

  async findById(id: number) {
    let response: AxiosResponse;
    try {
      response = await this.api.get(this.endPoint + `from/${id}`);
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

  async deleteById(id: number) {
    let response: AxiosResponse;
    try {
      response = await this.api.delete(this.endPoint + `/${id}`);
    } catch (e) {
      throw new ApiError(response!);
    }
  }

  async updateById({
    status,
    taskId,
    description,
    toDoListId,
  }: UpdateParams) {
    let response: AxiosResponse;
    try {
      response = await this.api.put(this.endPoint + `/${taskId}`, {
        description,
        status,
        toDoListId,
      });
      return response;
    } catch (e) {
      throw new ApiError(response!);
    }
  }
}

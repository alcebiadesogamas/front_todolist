import { AbstractRepository } from './AbstractRepository';
import { ApiError } from '../services/ApiError';
import { AxiosResponse } from 'axios';

interface CreateParams {
  description: string;
  todoList: {
    id: number;
    name: string;
    created_at: string;
  };
}

interface UpdateParams extends CreateParams {
  taskId: number;
  status: boolean;
}
export class TaskRepository extends AbstractRepository {
  private readonly endPoint: string = 'task';
  async create({
    description,
    todoList: { id, name, created_at },
  }: CreateParams) {
    let response: AxiosResponse;
    try {
      response = await this.api.post(this.endPoint, {
        description,
        status: false,
        toDoList: {
          id,
          name,
          created_at,
        },
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
      response = await this.api.get(this.endPoint + `/${id}`);
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
    todoList: { id, name, created_at },
  }: UpdateParams) {
    let response: AxiosResponse;
    try {
      response = await this.api.put(this.endPoint + `/${taskId}`, {
        description,
        status,
        toDoList: {
          id,
          name,
          created_at,
        },
      });
      return response;
    } catch (e) {
      throw new ApiError(response!);
    }
  }
}

import { API } from '../services/API';

export abstract class AbstractRepository {
  protected api = new API().ApiInstance;
}

import { FetchStatus } from '../store/interfaces';

export type IResponse = {
  type: FetchStatus
  message: string;
}

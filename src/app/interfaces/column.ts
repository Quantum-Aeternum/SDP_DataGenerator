import { Random } from '../models/random';

export interface Column {
  name: string,
  value: Random,
  required?: boolean
}

import { Random } from '../models/random';

export interface Column {
  table: string;
  name: string;
  value: Random;
  references: number;
  readonly?: boolean;
}

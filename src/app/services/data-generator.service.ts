import { Injectable } from '@angular/core';
import { DataGeneratorSettings } from '../models/data-generator-settings.model';

@Injectable({
  providedIn: 'root'
})
export class DataGeneratorService {

  constructor(private dataSettings: DataGeneratorSettings) { }
}

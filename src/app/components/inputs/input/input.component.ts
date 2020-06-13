import { Component, OnInit, Input } from '@angular/core';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { Random } from 'src/app/models/random';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() value: Object | undefined;
  @Input() settings: Parameter | undefined;

  protected dataTypes = DataType;

  constructor() {
  }

  ngOnInit() {
  }

}

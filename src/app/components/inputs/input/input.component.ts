import { Component, OnInit, Input } from '@angular/core';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { Random } from 'src/app/models/random';
import { Column } from 'src/app/models/column';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() name: string = "Input";
  @Input() value: Object | undefined;
  @Input() settings: Parameter | undefined;
  @Input() column: Column | undefined;

  protected dataTypes = DataType;
  protected childName: string = "Input";

  constructor() {
  }

  ngOnInit() {
    if (this.settings) this.childName = this.settings.name;
  }

}

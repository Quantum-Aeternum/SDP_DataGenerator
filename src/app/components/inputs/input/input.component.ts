import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { Random } from 'src/app/models/random';
import { Column } from 'src/app/models/column';

export interface ChangeTypeObject {
  obj: Random,
  parameter: Parameter | undefined
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() name: string = "Type";
  @Input() column: Column | undefined;
  @Input() value: Object | undefined;
  @Input() settings: Parameter | undefined;

  @Output() onChange: EventEmitter<Object> = new EventEmitter<Object>();

  protected childName: string = "Type";
  protected nestedInputs: Array<Parameter> | undefined;

  protected dataTypes = DataType;
  protected terminalTypes: Array<DataType> = [DataType.string, DataType.number];
  protected settingsType: DataType = DataType.Random;

  constructor() {
  }

  ngOnInit() {
    if (this.settings) {
      this.childName = this.settings.name;
      this.settingsType = this.settings.type;
    }
    if (!this.terminalTypes.includes(this.settingsType)) {
      this.nestedInputs = (<Random>this.value).settings();
    }
  }

  commit(): void {
    if (this.value && this.nestedInputs) {
      (<Random>this.value).update(this.nestedInputs);
    }
    this.onChange.emit(this.value);
  }

  changedSelection(newSelection: Random): void {
    this.value = newSelection;
    (<Random>this.value).setOwner(this.column);
    this.nestedInputs = (<Random>this.value).settings();
    if (this.settings) {
      this.settings.value = this.value;
    }
    this.onChange.emit(this.value);
  }
}

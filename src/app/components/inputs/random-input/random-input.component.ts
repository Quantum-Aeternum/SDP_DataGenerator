import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { Random } from 'src/app/models/random';
import { Column } from 'src/app/models/column';

@Component({
  selector: 'app-random-input',
  templateUrl: './random-input.component.html',
  styleUrls: ['./random-input.component.css']
})
export class RandomInputComponent implements OnInit {

  @Input() name: string = "Type";
  @Input() random: Random | undefined;
  @Input() allowedBaseType: DataType = DataType.RandomNumber;
  @Input() column: Column | undefined;

  @Output() onChange: EventEmitter<Random> = new EventEmitter<Random>();

  protected acceptedTypes: Array<DataType> = [DataType.RandomNumber, DataType.RandomString, DataType.RandomChoice];
  protected dataTypes = DataType;
  protected nestedInputs: Array<Parameter> | undefined;

  constructor() {
  }

  ngOnInit() {
    if (this.random) this.nestedInputs = this.random.settings();
  }

  commit(): void {
    if (this.random && this.nestedInputs) {
      this.random.update(this.nestedInputs);
    }
  }

  changeRandom(newRandom: Random): void {
    this.random = newRandom;
    this.random.setOwner(this.column);
    this.nestedInputs = this.random.settings();
    this.onChange.emit(this.random);
  }
}

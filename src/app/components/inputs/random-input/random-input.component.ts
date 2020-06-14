import { Component, OnInit, Input } from '@angular/core';
import { Parameter, DataType } from 'src/app/interfaces/parameter';
import { Random } from 'src/app/models/random';

@Component({
  selector: 'app-random-input',
  templateUrl: './random-input.component.html',
  styleUrls: ['./random-input.component.css']
})
export class RandomInputComponent implements OnInit {

  @Input() name: string = "Input";
  @Input() random: Random | undefined;
  @Input() settings: Parameter | undefined;

  protected acceptedTypes: Array<DataType> = [DataType.RandomNumber, DataType.RandomString, DataType.RandomChoice];
  protected dataTypes = DataType;
  protected nestedInputs: Array<Parameter> | undefined;

  constructor() {
  }

  ngOnInit() {
    if (this.random) this.nestedInputs = this.random.settings();
  }

  commit() {
    if (this.random && this.nestedInputs) {
      this.random.update(this.nestedInputs);
    }
  }
}

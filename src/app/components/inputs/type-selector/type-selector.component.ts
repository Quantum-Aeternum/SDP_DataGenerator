import { Component, OnInit, Input } from '@angular/core';
import { DataType } from 'src/app/interfaces/parameter';
import { FixedNumber } from 'src/app/models/numbers/fixed-number';
import { FloatNumber } from 'src/app/models/numbers/float-number';
import { IntegerNumber } from 'src/app/models/numbers/integer-number';
import { NumberAddition } from 'src/app/models/numbers/number-addition';
import { NumberSubtraction } from 'src/app/models/numbers/number-subtraction';
import { NumberMultiplication } from 'src/app/models/numbers/number-multiplication';
import { NumberDivision } from 'src/app/models/numbers/number-division';
import { RandomChoice } from 'src/app/models/choices/random-choice';
import { CurrencyFormat } from 'src/app/models/formats/currency-format';
import { FixedString } from 'src/app/models/strings/fixed-string';
import { RandomString } from 'src/app/models/strings/random-string';

@Component({
  selector: 'app-type-selector',
  templateUrl: './type-selector.component.html',
  styleUrls: ['./type-selector.component.css']
})
export class TypeSelectorComponent implements OnInit {

  private dataTypeHierarchy = {
    'Random': {
      'RandomNumber': {
        'FixedNumber': new FixedNumber(),
        'FloatNumber': new FloatNumber(),
        'IntegerNumber': new IntegerNumber(),
        'NumberManipulator': {
          'NumberAddition': new NumberAddition(),
          'NumberSubtraction': new NumberSubtraction(),
          'NumberMultiplication': new NumberMultiplication(),
          'NumberDivision': new NumberDivision()
        }
      },
      'RandomString': {
        'FixedString': new FixedString(),
        'RandomString': new RandomString()
      },
      'RandomChoice': {
        'RandomChoice': new RandomChoice()
      },
      'Format': {
        'CurrencyFormat': new CurrencyFormat()
      }
    }
  }

  @Input() name: string = "Type";
  @Input() selected: DataType | undefined;

  protected dataTypes = Object.keys(DataType);

  constructor() { }

  ngOnInit() {
  }

  changedSelection() {
    console.log(this.selected);
  }

}

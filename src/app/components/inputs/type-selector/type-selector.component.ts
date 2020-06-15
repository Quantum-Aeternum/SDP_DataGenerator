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

interface subTree {
  [key: string]: Object
}

@Component({
  selector: 'app-type-selector',
  templateUrl: './type-selector.component.html',
  styleUrls: ['./type-selector.component.css']
})
export class TypeSelectorComponent implements OnInit {

  private dataTypeHierarchy: subTree = {
    'Random': {
      'RandomNumber': {
        'FixedNumber': {value: new FixedNumber()},
        'FloatNumber': {value: new FloatNumber()},
        'IntegerNumber': {value: new IntegerNumber()},
        'NumberManipulator': {
          'NumberAddition': {value: new NumberAddition()},
          'NumberSubtraction': {value: new NumberSubtraction()},
          'NumberMultiplication': {value: new NumberMultiplication()},
          'NumberDivision': {value: new NumberDivision()}
        }
      },
      'RandomString': {
        'FixedString': {value: new FixedString()},
        'RandomString': {value: new RandomString()}
      },
      'RandomChoice': {
        'RandomChoice': {value: new RandomChoice()}
      },
      'Format': {
        'CurrencyFormat': {value: new CurrencyFormat()}
      }
    }
  };

  @Input() name: string = "Type";
  @Input() selected: DataType | undefined;
  @Input() allowedBaseType: DataType = DataType.Random;

  protected linearHierarchy: subTree = {};
  protected allowedTypes: Array<string> = [];

  constructor() {}

  ngOnInit() {
    this.linearHierarchy = this.flattenHierarchy(
      this.findSubHierarchy(this.dataTypeHierarchy, this.allowedBaseType)
    );
    this.allowedTypes = Object.keys(this.linearHierarchy);
  }

  findSubHierarchy(tree: subTree, baseType: DataType): subTree {
    let keys: Array<string> = Object.keys(tree);
    let baseIndex: number = keys.indexOf(baseType);
    if (baseIndex > -1) return <subTree>tree[baseType];
    else {
      let subTree: subTree = {};
      for (let index = 0; index < keys.length; index++) {
        let key = keys[index];
        if (key != "value") subTree = this.findSubHierarchy(<subTree>tree[key], baseType);
        if (subTree != {}) break;
      }
      return subTree;
    }
  }

  flattenHierarchy(tree: subTree): subTree {
    const flattened: subTree = {};
    let keys: Array<string> = Object.keys(tree);
    keys.forEach(key => {
      if (Object.keys(tree[key])[0] == "value") {
        flattened[key] = tree[key];
      }
      else {
        Object.assign(flattened, this.flattenHierarchy(<subTree>tree[key]));
      }
    })
    return flattened;
  }

  changedSelection() {

  }

}

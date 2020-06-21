import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
import { Random } from 'src/app/models/random';
import { ContainerService } from 'src/app/services/container.service';
import { Column } from 'src/app/models/column';

interface subTree {
  [key: string]: Object
}

@Component({
  selector: 'app-type-selector',
  templateUrl: './type-selector.component.html',
  styleUrls: ['./type-selector.component.css']
})
export class TypeSelectorComponent implements OnInit {

  private dataTypeKeys: Array<string> = Object.keys(DataType);
  private dataTypeValues: Array<string> = Object.values(DataType);
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
        },
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
  @Input() column: Column | undefined;
  @Input() value: Random | undefined;
  @Input() allowedBaseType: DataType = DataType.Random;
  @Output() onChange: EventEmitter<Random> = new EventEmitter<Random>();

  protected linearHierarchy: subTree = {};
  protected allowedTypes: Array<string> = [];
  protected selectableColumns: Array<Column> = [];
  protected selected: Object | undefined;

  constructor(
    private container: ContainerService
  ) {}

  ngOnInit() {
    // Create hierachies
    this.linearHierarchy = this.flattenHierarchy(
      this.findSubHierarchy(this.dataTypeHierarchy, this.allowedBaseType)
    );

    // Get allowed types array
    this.allowedTypes = Object.keys(this.linearHierarchy).map(key => {
      let index = this.dataTypeKeys.indexOf(key);
      return this.dataTypeValues[index];
    }).sort();

    // Get allowed column references
    this.selectableColumns = this.container.getSelectableColumns(this.column).filter(col => {
      return this.allowedTypes.includes(col.getValue().getType());
    });

    // Set selected type
    if (this.value) {
      let owner = this.value.getOwner();
      if (owner && owner != this.column) this.selected = owner.getFullname();
      else this.selected = this.value.getType();
    }
  }

  findSubHierarchy(tree: subTree, baseType: DataType): subTree {

    let index: number = this.dataTypeValues.indexOf(baseType);
    let baseTypeKey: string = this.dataTypeKeys[index];

    let keys: Array<string> = Object.keys(tree);
    let baseIndex: number = keys.indexOf(baseTypeKey);

    if (baseIndex > -1) return <subTree>tree[baseTypeKey];
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
    if (this.selected != undefined)
    {
      if (this.dataTypeValues.includes(this.selected.toString())) {
        let index = this.dataTypeValues.indexOf(this.selected.toString());
        let key = this.dataTypeKeys[index];
        this.onChange.emit(<Random>(<subTree>this.linearHierarchy[key])["value"]);
      }
      else {
        let index = this.selectableColumns.findIndex(col => {
          return this.selected != undefined && (col.getFullname() == this.selected.toString())
        });
        this.onChange.emit(this.selectableColumns[index].getValue());
      }
    }
  }

}

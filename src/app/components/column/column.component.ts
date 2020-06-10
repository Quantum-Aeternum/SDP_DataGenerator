import { Component, OnInit, Input } from '@angular/core';
import { Column } from 'src/app/interfaces/column';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {

  @Input() column: Column | undefined;
  protected buttons: Array<string> = ["Edit Column", "Delete Column"]

  constructor() { }

  ngOnInit() {
  }

}

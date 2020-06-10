import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-controls',
  templateUrl: './toggle-controls.component.html',
  styleUrls: ['./toggle-controls.component.css']
})
export class ToggleControlsComponent implements OnInit {

  @Input() buttons: Array<string> | undefined;
  @Output() clicked: EventEmitter<number> = new EventEmitter<number>();

  protected showControls: boolean = true;
  protected toggleControlsText: "Show Controls" | "Hide Controls" = "Hide Controls";

  constructor() { }

  ngOnInit() {
  }

  protected toggleControls(): void {
    this.showControls = !this.showControls;
    if (this.showControls) this.toggleControlsText = "Hide Controls";
    else this.toggleControlsText = "Show Controls";
  }

  protected onClick(id: number): void {
    this.clicked.emit(id);
  }

}

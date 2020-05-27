import { Component } from '@angular/core';
import { DataGeneratorSettings } from './models/data-generator-settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sdp-gen';
  dataGenSettings: DataGeneratorSettings = new DataGeneratorSettings();
}

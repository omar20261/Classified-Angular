import { Component } from '@angular/core';
import { GvarsService } from './services/G_vars/gvars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public Gv:GvarsService){}
}

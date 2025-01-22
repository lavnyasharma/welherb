import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-strips',
  templateUrl: './strips.component.html',
  styleUrl: './strips.component.css'
})
export class StripsComponent {
  @Input() color: string = ''; 

}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dietry-advice',
  templateUrl: './dietry-advice.component.html',
  styleUrls: ['./dietry-advice.component.css']
})
export class DietryAdviceComponent {
  @Input() dietaryAdvice: string[] = [];
  @Input() helpsHow: string[] = [];
  @Input() helpsWho: string[] = [];
}
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrl: './ingredients-page.component.css'
})
export class IngredientsPageComponent implements OnInit {
  images: any[] = [];
  isLoading: boolean = true;

  constructor(private apiservice: ApiService) {

    this.apiservice.ingredients$.subscribe(data => {
      console.log(data);
      // Map the data to retrieve only the name and url for each item
      this.images = data.map((item: { name: string, url: string }) => ({
        name: item.name,
        image: '/welherb' + item.url
      }));
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.apiservice.getIngredients();
  }

  // Track by function for better performance with *ngFor
  trackByName(index: number, item: any): string {
    return item.name;
  }

  // Handle image loading errors

}
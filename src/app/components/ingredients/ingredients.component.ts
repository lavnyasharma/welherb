import { ApiService } from "./../../../services/api.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ingredients",
  templateUrl: "./ingredients.component.html",
  styleUrls: ["./ingredients.component.css"],
})
export class IngredientsComponent implements OnInit {
  images: Array<{ name: string; url: string }> = [];

  constructor(private apiservice: ApiService) {
    this.apiservice.ingredients$.subscribe((data) => {
      // Map the data to retrieve only the name and url for each item
      this.images = data.map((item: { name: string; url: string }) => ({
        name: item.name,
        url: "/welherb" + item.url,
      }));
          console.log(this.images);
    });

  }

  ngOnInit(): void {
    this.apiservice.getIngredients();
  }
}

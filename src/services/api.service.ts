import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable, Subject, from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private proxyPrefix = "/welherb"
  constructor(
    private http: HttpClient,
  ) { 
    
  }
  private ingredientsList = new Subject<any>();
  private homeProducts = new Subject<any>();

  ingredients$ = this.ingredientsList.asObservable();
  products$ = this.homeProducts.asObservable();
  getIngredients() {
    this.http
      .get<any[]>(this.proxyPrefix + "/ingredients")
      .subscribe((data: any) => {
        this.ingredientsList.next(data);
      });
  }
  getHomeProducts() {
    this.http
      .get<any[]>(this.proxyPrefix + "/products/0/5")
      .subscribe((data: any) => {
        this.homeProducts.next(data);
      });
  }
}

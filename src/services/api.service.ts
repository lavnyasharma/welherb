import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
  signUp(name: string, email: string, password: string) {
    const payload = { name, email, password };
  
    return this.http.post<any>(`${this.proxyPrefix}/user/register`, payload);
  }
  
  login(email: string, password: string) {
    const payload = {  email, password };
    return this.http.post<any>(`${this.proxyPrefix}/user/login`, payload);
  }
  getAllProducts(){
    return this.http.get<any[]>(this.proxyPrefix + "/products/0/100")
  }
  addToCart(productId: string) {
    const payload = { productId };
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem("auth_token"), // Replace with actual token retrieval logic
      'Content-Type': 'application/json'
    });
  
    return this.http.post<any>(`${this.proxyPrefix}/user/cart/add`, payload, { headers });
  }
  
}

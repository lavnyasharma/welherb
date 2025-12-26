import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private proxyPrefix = "/welherb";

  constructor(private http: HttpClient) {}

  private ingredientsList = new Subject<any>();
  private homeProducts = new Subject<any>();

  ingredients$ = this.ingredientsList.asObservable();
  products$ = this.homeProducts.asObservable();

  // ---------------- Existing Functions ---------------- //
  getIngredients() {
    this.http
      .get<any[]>(this.proxyPrefix + "/ingredients")
      .subscribe((data: any) => this.ingredientsList.next(data));
  }

  getHomeProducts() {
    this.http
      .get<any[]>(this.proxyPrefix + "/products/0/100")
      .subscribe((data: any) => this.homeProducts.next(data));
  }

  // ---------------- Auth (Email/Password - Legacy) ---------------- //
  signUp(name: string, email: string, password: string) {
    const payload = { name, email, password };
    return this.http.post<any>(`${this.proxyPrefix}/user/register`, payload);
  }

  login(email: string, password: string) {
    const payload = { email, password };
    return this.http.post<any>(`${this.proxyPrefix}/user/login`, payload);
  }

  // ---------------- Auth (Mobile + OTP) ---------------- //

  /**
   * Initiate login/signup by sending OTP to the given mobile number.
   */
  sendOtp(mobile: string) {
    const payload = { mobile };
    return this.http.post<any>(`${this.proxyPrefix}/user/login`, payload);
  }

  /**
   * Verify the OTP for the given mobile number.
   */
  verifyOtp(mobile: string, otp: string) {
    const payload = { mobile, otp };
    return this.http.post<any>(`${this.proxyPrefix}/user/verifyLogin`, payload);
  }

  getAllProducts(category?: string) {
    const params = category
      ? new HttpParams().set("category", category)
      : undefined;
    return this.http.get<any[]>(this.proxyPrefix + "/products/0/100", {
      params,
    });
  }

  addToCart(productId: string, size: string) {
    const payload = { productId, size };
    const headers = this.authHeaders(true);
    return this.http.post<any>(`${this.proxyPrefix}/user/cart/add`, payload, {
      headers,
    });
  }

  getCartItems() {
    const headers = this.authHeaders(true);
    return this.http.get<any>(`${this.proxyPrefix}/user/cart`, { headers });
  }

  removeCartItem(id: string) {
    const headers = this.authHeaders();
    return this.http.delete<any>(`${this.proxyPrefix}/user/cart/${id}`, {
      headers,
    });
  }

  getOneProduct(id: string) {
    const headers = this.authHeaders();
    return this.http.get<any>(`${this.proxyPrefix}/products/${id}`, {
      headers,
    });
  }

  searchSomething(searchValue: string) {
    const headers = this.authHeaders();
    return this.http.get<any>(
      `${this.proxyPrefix}/products/0/100?searchValue=${searchValue}`,
      { headers }
    );
  }

  getUserProfile() {
    const headers = this.authHeaders();
    return this.http.get<any>(`${this.proxyPrefix}/user/profile`, { headers });
  }

  getDosage(id: string) {
    const headers = this.authHeaders();
    return this.http.get<any>(`${this.proxyPrefix}/user/dosage/${id}`, {
      headers,
    });
  }

  updateUserProfile(payload: any) {
    const headers = this.authHeaders(true);
    return this.http.post<any>(`${this.proxyPrefix}/user/update`, payload, {
      headers,
    });
  }

  addUserProfile(payload: any) {
    const headers = this.authHeaders(true);
    return this.http.post<any>(
      `${this.proxyPrefix}/user/profile/add`,
      payload,
      { headers }
    );
  }

  deleteUserProfile(id: string) {
    const headers = this.authHeaders();
    return this.http.delete<any>(`${this.proxyPrefix}/user/profile/${id}`, {
      headers,
    });
  }

  changeUserPassword(payload: any) {
    const headers = this.authHeaders(true);
    return this.http.post<any>(
      `${this.proxyPrefix}/user/changePassword`,
      payload,
      { headers }
    );
  }

  // ---------------- Delivery APIs ---------------- //
  getDeliveryAvailability(pincode: string) {
    return this.http.get<any>(
      `${this.proxyPrefix}/delivery/availability/${pincode}`
    );
  }

  getEstimateTime(pincode: string) {
    return this.http.get<any>(
      `${this.proxyPrefix}/delivery/estimate-time/${pincode}`
    );
  }

  getDeliveryAmount(pincode: string, type: "Pre-Paid" | "COD") {
    return this.http.get<any>(
      `${this.proxyPrefix}/delivery/delivery-amount/${pincode}/${type}`
    );
  }

  // ---------------- Address APIs ---------------- //
  getAddresses() {
    const headers = this.authHeaders();
    return this.http.get<any>(`${this.proxyPrefix}/user/addresses`, {
      headers,
    });
  }

  addAddress(payload: any) {
    const headers = this.authHeaders(true);
    return this.http.post<any>(
      `${this.proxyPrefix}/user/addresses/add`,
      payload,
      { headers }
    );
  }

  updateAddress(payload: any) {
    const headers = this.authHeaders(true);
    return this.http.post<any>(
      `${this.proxyPrefix}/user/addresses/update`,
      payload,
      { headers }
    );
  }

  // ---------------- Orders APIs ---------------- //
  getOrders(page: number = 1, limit: number = 10) {
    const headers = this.authHeaders();
    const offset = (page - 1) * limit;
    return this.http.get<any>(
      `${this.proxyPrefix}/user/orders/${offset}/${limit}`,
      { headers }
    );
  }

  getOrderById(orderId: string) {
    const headers = this.authHeaders();
    return this.http.get<any>(`${this.proxyPrefix}/user/orders/${orderId}`, {
      headers,
    });
  }

  createOrder(payload: any) {
    const headers = this.authHeaders(true);
    return this.http.post<any>(
      `${this.proxyPrefix}/user/orders/create`,
      payload,
      { headers }
    );
  }

  // ---------------- Blogs API ---------------- //
  getRandomBlogs() {
    return this.http.get<any[]>(`${this.proxyPrefix}/homepage/random_blogs`);
  }

  // ---------------- Helper: Auth Headers ---------------- //
  private authHeaders(json: boolean = false): HttpHeaders {
    const token = localStorage.getItem("auth_token") || "";
    let headersConfig: any = { Authorization: token };
    if (json) headersConfig["Content-Type"] = "application/json";
    return new HttpHeaders(headersConfig);
  }
}

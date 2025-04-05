import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service'; // adjust path as needed
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  color = "rgb(171 221 247)";
  product: any;
  productImages: string[] = [];
  selectedImage: string = '';
  selectedCapsule: number = 0;
  quantity = 1;
  isInCart: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  priceMap: any = {};

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.apiService.getOneProduct(productId).subscribe((data: any) => {
        this.priceMap = data.price;
  
        this.product = {
          title: data.name,
          subtitle: data.description,
          price: data.price[data.size[0]], // default
          priceMap: data.price,
          capsuleOptions: data.size,
          features: {
            reduces: data.helps_how?.filter((line: string) => line.toLowerCase().includes('reduce') || line.toLowerCase().includes('arthritis') || line.toLowerCase().includes('pain')) || [],
            calms: [], // not present in data
            boosts: data.helps_how?.filter((line: string) => line.toLowerCase().includes('boost') || line.toLowerCase().includes('mobility') || line.toLowerCase().includes('energy')) || [],
          },
          rating: 4.8,
          reviews: 132
        };
  
        this.productImages = data.images?.map((img: any) => '/welherb' + img.image) || [data.default_image];
        this.selectedImage = this.productImages[0];
        this.selectedCapsule = data.size?.[0] || 0;
      });
      this.cartService.cartLoaded.subscribe((loaded) => {
        if (loaded && productId) {
          this.isInCart = this.cartService.isProductInCart(productId);
        }
      });
    }
  }
  
  addToCart() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (!productId) return;
  
    if (!this.cartService.isProductInCart(productId)) {
      this.cartService.addToCart(productId, this.selectedCapsule.toString());
      this.isInCart = true;
    }
  }
  
  selectImage(image: string) {
    this.selectedImage = image;
  }

  selectCapsule(capsule: number) {
    this.selectedCapsule = capsule;
    if (this.product && this.product.price) {
      this.product.price = this.product.priceMap?.[capsule] || this.product.price;
    }
  }
  
  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}

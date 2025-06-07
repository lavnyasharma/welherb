import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service'; // adjust path as needed
import { CartService } from '../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  dosage: {
    morning?: string;
    afternoon?: string;
    evening?: string;
    error?: string;
  } = {};
  
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
  private cartService: CartService,
  private toastr: ToastrService,
  private router: Router
  ) {
 
  }

  priceMap: any = {};
  showModal = false;


ngOnInit(): void {
  const token = localStorage.getItem("auth_token");
  if (!token) {
    this.router.navigate(['/login']);
    return;
  }

  const productId = this.route.snapshot.paramMap.get('id');
  console.log(productId);
  
  if (productId) {

    this.apiService.getOneProduct(productId).subscribe((data: any) => {
    
      this.priceMap = data.price;

      this.product = {
        id: data._id,
        title: data.name,
        subtitle: data.description,
        faq: data.faq,
        price: data.price[data.size[0]], // default
        priceMap: data.price,
        capsuleOptions: data.size,
        dietary_advice: data.dietary_advice,
        helps_how: data.helps_how,
        helps_who: data.helps_who,
        features: {
          reduces: data.helps_how?.filter((line: string) =>
            line.toLowerCase().includes('reduce') ||
            line.toLowerCase().includes('arthritis') ||
            line.toLowerCase().includes('pain')) || [],
          calms: [],
          boosts: data.helps_how?.filter((line: string) =>
            line.toLowerCase().includes('boost') ||
            line.toLowerCase().includes('mobility') ||
            line.toLowerCase().includes('energy')) || [],
        },
        rating: 4.8,
        reviews: 132
      };

      this.productImages = data.images.map((image: string) => '/welherb' + image);
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
      this.toastr.success('Product added to cart', 'Success');
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
  openModal(id: string) {
    this.apiService.getDosage(id).subscribe(
      (data: any) => {
        if (data?.error) {
          this.dosage = { error: 'No dosage available!' };
        } else {
          this.dosage = data;
        }
        this.showModal = true;
      },
      (error) => {
        // Optional: handle request failure
        this.dosage = { error: 'No dosage available!' };
        this.showModal = true;
      }
    );
  }
  
  
  
  closeModal() {
    this.showModal = false;
  }
}

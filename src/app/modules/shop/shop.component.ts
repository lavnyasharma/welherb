import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  color= "rgb(171 221 247)"
  product = {
    title: 'ESR COUNT',
    subtitle: '100% Natural Antibiotic',
    price: 999,
    rating: 4.7,
    reviews: 90,
    features: {
      reduces: ['Joint pains', 'Sciatic ache', 'Sprain/Strain pain', 'Seasonal Body pain'],
      calms: ['Inflammation', 'Swelling'],
      boosts: ['Joint health', 'Strength', 'Mobility'],
    },
    capsuleOptions: [30, 60],
  };

  productImages = [
    'https://www.velonna.co/_next/image?url=https%3A%2F%2Fpldwzgpchvgtdycyfaky.supabase.co%2Fstorage%2Fv1%2F%2Fobject%2Fpublic%2Fvelonnabucket%2Fuploads%2Fproducts%2F1185%2F0M1A1085.jpg&w=1200&q=75',
    'https://www.velonna.co/_next/image?url=https%3A%2F%2Fpldwzgpchvgtdycyfaky.supabase.co%2Fstorage%2Fv1%2F%2Fobject%2Fpublic%2Fvelonnabucket%2Fuploads%2Fproducts%2F1185%2F0M1A3757.jpg&w=1200&q=75',
    'https://www.velonna.co/_next/image?url=https%3A%2F%2Fpldwzgpchvgtdycyfaky.supabase.co%2Fstorage%2Fv1%2F%2Fobject%2Fpublic%2Fvelonnabucket%2Fuploads%2Fproducts%2F1185%2F0M1A1085.jpg&w=1200&q=75',
    'https://www.velonna.co/_next/image?url=https%3A%2F%2Fpldwzgpchvgtdycyfaky.supabase.co%2Fstorage%2Fv1%2F%2Fobject%2Fpublic%2Fvelonnabucket%2Fuploads%2Fproducts%2F1185%2F0M1A1085.jpg&w=1200&q=75',
  ];
  selectedImage = this.productImages[0];
  selectedCapsule = this.product.capsuleOptions[0];
  quantity = 1;

  selectImage(image: string) {
    this.selectedImage = image;
  }

  selectCapsule(capsule: number) {
    this.selectedCapsule = capsule;
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

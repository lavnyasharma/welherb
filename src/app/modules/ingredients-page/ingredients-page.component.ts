import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

export interface IngredientDetail {
  name: string;
  image: string;
  benefits: string[];
  greatFor: {
    digestive: boolean;
    respiratory: boolean;
    cardiovascular: boolean;
  };
  foundIn: {
    name: string;
    image: string;
    price: string;
  }[];
}

@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrl: './ingredients-page.component.css'
})
export class IngredientsPageComponent implements OnInit {
  images: any[] = [];
  isLoading: boolean = true;
  isModalOpen: boolean = false;
  selectedIngredient: any = null;

  // Static ingredient details - you can expand this or make it dynamic
  ingredientDetails: { [key: string]: IngredientDetail } = {
    'Ajwain': {
      name: 'Ajwain',
      image: '/assets/images/ajwain.jpg',
      benefits: [
        'Renowned for its soothing carminative properties, Ajwain helps alleviate bloating, indigestion and colic pain. It is also safe and beneficial for pregnant women to help ease digestive discomfort.',
        'Rich in thymol and other micronutrients, it offers potent antimicrobial and antispasmodic benefits that support respiratory and cardiovascular function.'
      ],
      greatFor: {
        digestive: true,
        respiratory: true,
        cardiovascular: true
      },
      foundIn: [
        { name: 'Liv Renew', image: '/assets/images/liv-renew.jpg', price: '₹449' },
        { name: 'Liv Renew', image: '/assets/images/liv-renew.jpg', price: '₹449' },
        { name: 'Liv Renew', image: '/assets/images/liv-renew.jpg', price: '₹449' },
        { name: 'Liv Renew', image: '/assets/images/liv-renew.jpg', price: '₹449' }
      ]
    },
    'Turmeric': {
      name: 'Turmeric',
      image: '/assets/images/turmeric.jpg',
      benefits: [
        'Contains curcumin, a powerful anti-inflammatory compound that helps reduce inflammation throughout the body.',
        'Supports joint health and mobility while providing antioxidant protection against free radicals.'
      ],
      greatFor: {
        digestive: true,
        respiratory: false,
        cardiovascular: true
      },
      foundIn: [
        { name: 'Joint Care', image: '/assets/images/joint-care.jpg', price: '₹549' },
        { name: 'Immunity Boost', image: '/assets/images/immunity.jpg', price: '₹399' }
      ]
    },
    'Ashwagandha': {
      name: 'Ashwagandha',
      image: '/assets/images/ashwagandha.jpg',
      benefits: [
        'An adaptogenic herb that helps the body manage stress and promotes better sleep quality.',
        'Supports healthy energy levels and helps maintain normal cortisol levels in the body.'
      ],
      greatFor: {
        digestive: false,
        respiratory: false,
        cardiovascular: true
      },
      foundIn: [
        { name: 'Stress Relief', image: '/assets/images/stress-relief.jpg', price: '₹629' },
        { name: 'Energy Boost', image: '/assets/images/energy.jpg', price: '₹479' }
      ]
    }
  };

  // Default ingredient detail for unknown ingredients
  defaultIngredientDetail: IngredientDetail = {
    name: 'Unknown Ingredient',
    image: '/assets/images/default.jpg',
    benefits: [
      'This ingredient has been used in traditional Ayurvedic medicine for centuries.',
      'Known for its natural healing properties and health benefits.'
    ],
    greatFor: {
      digestive: true,
      respiratory: true,
      cardiovascular: true
    },
    foundIn: [
      { name: 'Liv Renew', image: '/assets/images/liv-renew.jpg', price: '₹449' },
      { name: 'Health Booster', image: '/assets/images/health-boost.jpg', price: '₹399' }
    ]
  };

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

  // Handle ingredient card click
  onIngredientClick(ingredient: any): void {
    this.selectedIngredient = ingredient;
    this.isModalOpen = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  // Handle modal close
  onModalClose(): void {
    this.isModalOpen = false;
    this.selectedIngredient = null;
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }

  // Handle backdrop click
  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onModalClose();
    }
  }

  // Get ingredient detail for the selected ingredient
  getCurrentIngredientDetail(): IngredientDetail {
    if (!this.selectedIngredient) {
      return this.defaultIngredientDetail;
    }

    const detail = this.ingredientDetails[this.selectedIngredient.name];
    if (detail) {
      // Update the image to use the actual ingredient image
      return {
        ...detail,
        image: this.selectedIngredient.image
      };
    }

    // Return default with the ingredient's actual name and image
    return {
      ...this.defaultIngredientDetail,
      name: this.selectedIngredient.name,
      image: this.selectedIngredient.image
    };
  }

  // Handle product check functionality
  checkProduct(product: any): void {
    console.log('Check product:', product);
    // Add your product navigation logic here
    // For example: this.router.navigate(['/product', product.id]);
  }

  // Handle image loading errors
  onImageError(event: any): void {
    console.log('Image failed to load:', event);
    // You can set a default image here if needed
    // event.target.src = '/assets/images/default-ingredient.jpg';
  }
}
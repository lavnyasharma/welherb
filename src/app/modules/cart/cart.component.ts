import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CartService } from '../../../services/cart.service';

interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  productType: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  inStock: boolean;
}

interface DeliveryAddress {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  selected: boolean;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentStep = 1;
  totalSteps = 4;
  taxRate = 3;
  
  // Cart data from your existing service
  cartItems: CartItem[] = [];

  deliveryAddresses: DeliveryAddress[] = [
    {
      id: 1,
      name: 'Home',
      address: '32 Lakeview Crescent, Rosewood Heights, Pune, Maharashtra 411045, India',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411045',
      phone: '',
      selected: true
    },
    {
      id: 2,
      name: 'Office',
      address: '17 Greenpark Lane, Sector 62, Noida, Uttar Pradesh 201309, India',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201309',
      phone: '',
      selected: false
    }
  ];

  // Form data
  discountCode = '';
  selectedPaymentMethod = '';
  newAddress = {
    email: '',
    pincode: '',
    name: '',
    phone: '',
    address: '',
    state: '',
    city: ''
  };

  // Survey data
  hearAboutUs: string[] = [];
  orderReason = '';

  // Payment methods
  paymentMethods = [
    { id: 'googlepay', name: 'Google Pay', type: 'recommended' },
    { id: 'upi', name: 'UPI (Pay via any App)', type: 'online' },
    { id: 'card', name: 'Debit/Credit Card', type: 'online' },
    { id: 'emi', name: 'EMI', type: 'online' },
    { id: 'cod', name: 'Cash On Delivery', type: 'other' }
  ];

  hearAboutOptions = [
    'Facebook',
    'Instagram',
    'Google Search',
    'Word of Mouth / Friend / Family',
    'Doctor or Practitioner',
    'Marketplace (Amazon / Flipkart etc.)',
    'Other (please specify)'
  ];

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.selectedPaymentMethod = 'googlepay';
    this.loadCartItems();
  }

  private loadCartItems(): void {
    this.cartService.cartItems$.subscribe((cartItemIds) => {
      console.log('Cart items updated:', cartItemIds);
      // Call API to get full details of items
      this.apiService.getCartItems().subscribe(
        (response: any[]) => {
          this.cartItems = response
            .filter(item => item?.product || item?.name) // Handle both structures
            .map(item => {
              const product = item.product || item;
              const selectedSize = item.size || 30;

              return {
                id: item._id,
                name: product.name || 'Unnamed',
                subtitle: `Size: ${selectedSize}`,
                category: product.categories?.join(', ') || '',
                productType: product.product_type || '',
                image: product.default_image ? '/welherb' + product.default_image : '',
                price: product.price?.[selectedSize] || 0,
                quantity: item.quantity || 1,
                size: selectedSize.toString(),
                inStock: true
              };
            });
        },
        (error) => {
          console.error('Error fetching cart items:', error);
        }
      );
    });
  }

  get totalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  get mrpTotal(): number {
    return this.subtotal;
  }

  get discount(): number {
    return 200; // Fixed discount for demo
  }

  get shipping(): number {
    return this.mrpTotal >= 499 ? 0 : 80;
  }

  get tax(): number {
    return Math.round((this.subtotal * this.taxRate) / 100);
  }

  get grandTotal(): number {
    return this.subtotal + this.shipping + this.tax - this.discount;
  }

  get total(): number {
    return this.subtotal + this.shipping + this.tax;
  }

  get savings(): number {
    return this.discount + (this.shipping === 0 ? 80 : 0);
  }

  // Missing quantity control functions
  increaseQuantity(itemId: string): void {
    const item = this.cartItems.find(item => item.id === itemId);
    if (item) {
      item.quantity++;
      // Update cart service if needed
      // this.cartService.updateQuantity(itemId, item.quantity);
    }
  }

  decreaseQuantity(itemId: string): void {
    const item = this.cartItems.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
      item.quantity--;
      // Update cart service if needed
      // this.cartService.updateQuantity(itemId, item.quantity);
    }
  }

  removeItem(id: string): void {
    this.cartService.removeFromCart(id);
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }

  get stepTitles(): string[] {
    return ['Offers', 'Shipping', 'Payment', 'Review'];
  }

  get currentStepTitle(): string {
    const titles = ['Offers', 'Delivery', 'Payment', 'FAQs'];
    return titles[this.currentStep - 1];
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }

  applyDiscount(): void {
    if (!this.discountCode.trim()) {
      alert('Please enter a discount code');
      return;
    }

    // Simulate discount application
    console.log('Applying discount code:', this.discountCode);
    
    // Here you would typically call an API to validate the discount code
    // For demo purposes, let's simulate some basic validation
    const validCodes = ['SAVE10', 'WELCOME20', 'FIRST50'];
    
    if (validCodes.includes(this.discountCode.toUpperCase())) {
      alert('Discount code applied successfully!');
      // You would update the discount amount here based on the code
    } else {
      alert('Invalid discount code. Please try again.');
    }
  }

  selectAddress(addressId: number): void {
    this.deliveryAddresses.forEach(addr => {
      addr.selected = addr.id === addressId;
    });
  }

  checkPincode(): void {
    if (!this.newAddress.pincode) {
      alert('Please enter a pincode');
      return;
    }

    console.log('Checking pincode:', this.newAddress.pincode);
    
    // Simulate pincode validation
    if (this.newAddress.pincode.length === 6 && /^\d+$/.test(this.newAddress.pincode)) {
      // Simulate API call to get city and state
      setTimeout(() => {
        // Mock response based on pincode
        if (this.newAddress.pincode.startsWith('4')) {
          this.newAddress.state = 'Maharashtra';
          this.newAddress.city = 'Pune';
        } else if (this.newAddress.pincode.startsWith('2')) {
          this.newAddress.state = 'Uttar Pradesh';
          this.newAddress.city = 'Noida';
        } else {
          this.newAddress.state = 'Delhi';
          this.newAddress.city = 'New Delhi';
        }
        alert('Pincode verified! Delivery available in your area.');
      }, 500);
    } else {
      alert('Please enter a valid 6-digit pincode');
    }
  }

  selectPaymentMethod(methodId: string): void {
    this.selectedPaymentMethod = methodId;
  }

  onHearAboutUsChange(option: string, event: any): void {
    const checked = event.target.checked;
    if (checked) {
      if (!this.hearAboutUs.includes(option)) {
        this.hearAboutUs.push(option);
      }
    } else {
      const index = this.hearAboutUs.indexOf(option);
      if (index > -1) {
        this.hearAboutUs.splice(index, 1);
      }
    }
  }

  submitOrder(): void {
    // Validation before submitting
    if (this.cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (this.currentStep >= 2) {
      const selectedAddress = this.deliveryAddresses.find(addr => addr.selected);
      if (!selectedAddress && !this.isNewAddressValid()) {
        alert('Please select or add a delivery address');
        return;
      }
    }

    if (this.currentStep >= 3 && !this.selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    console.log('Order submitted successfully!');
    console.log('Cart items:', this.cartItems);
    console.log('Selected address:', this.deliveryAddresses.find(addr => addr.selected));
    console.log('New address:', this.newAddress);
    console.log('Payment method:', this.selectedPaymentMethod);
    console.log('Hear about us:', this.hearAboutUs);
    console.log('Order reason:', this.orderReason);
    console.log('Total amount:', this.grandTotal);

    // Here you would typically call your API to submit the order
    alert('Order submitted successfully! You will be redirected to payment.');
    
    // Reset form or redirect to confirmation page
    // this.router.navigate(['/order-confirmation']);
  }

  private isNewAddressValid(): boolean {
    return !!(
      this.newAddress.name &&
      this.newAddress.phone &&
      this.newAddress.address &&
      this.newAddress.pincode &&
      this.newAddress.city
    );
  }

  // Original checkout method from your cart component
  checkout(): void {
    if (this.currentStep < this.totalSteps) {
      this.nextStep();
    } else {
      this.submitOrder();
    }
  }
}
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
  email?: string;
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

  deliveryAddresses: DeliveryAddress[] = [];
  pincodeResponse: any = null;
  isAddingAddress = false;
  isUpdatingAddress = false;

  // Order creation state
  isCreatingOrder = false;
  orderCreated = false;
  selectedOrder: any = null;

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
    
    // Load addresses immediately and also set a timeout to ensure it loads
    this.loadAddresses();
    setTimeout(() => {
      console.log('Current addresses after timeout:', this.deliveryAddresses);
    }, 1000);
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

  private loadAddresses(): void {
    this.apiService.getAddresses().subscribe(
      (response: any) => {
        console.log('Addresses loaded:', response);
        
        // Handle direct array response or nested addresses property
        let addresses = response;
        if (response && response.addresses) {
          addresses = response.addresses;
        }
        
        if (addresses && Array.isArray(addresses) && addresses.length > 0) {
          this.deliveryAddresses = addresses.map((addr: any, index: number) => ({
            id: addr._id || index + 1,
            name: addr.name || `Address ${index + 1}`,
            address: addr.address || '',
            city: addr.city || '',
            state: addr.state || '',
            pincode: addr.pincode || '',
            phone: addr.mobile || addr.phone || '', // Map mobile field to phone
            email: addr.email || '',
            selected: index === 0 // Select first address by default
          }));
          console.log('Mapped addresses:', this.deliveryAddresses);
        } else {
          // If no addresses from API, provide a default address
          this.deliveryAddresses = [
            {
              id: 1,
              name: 'Default Address',
              address: 'Please add your delivery address below',
              city: '',
              state: '',
              pincode: '',
              phone: '',
              selected: true
            }
          ];
        }
      },
      (error) => {
        console.error('Error loading addresses:', error);
        // Fallback to default address if API fails
        this.deliveryAddresses = [
          {
            id: 1,
            name: 'Default Address',
            address: 'Please add your delivery address below',
            city: '',
            state: '',
            pincode: '',
            phone: '',
            selected: true
          }
        ];
      }
    );
  }

  // Public method to refresh addresses (can be called from template if needed)
  refreshAddresses(): void {
    console.log('Manually refreshing addresses...');
    this.loadAddresses();
  }

  // Update mobile number for selected address
  updateMobileNumber(): void {
    const selectedAddress = this.deliveryAddresses.find(addr => addr.selected);
    if (selectedAddress && this.newAddress.phone.trim() !== '') {
      selectedAddress.phone = this.newAddress.phone;
      console.log('Mobile number updated for selected address:', selectedAddress);
    }
  }

  // Update mobile number in real-time when user types
  onMobileNumberChange(): void {
    const selectedAddress = this.deliveryAddresses.find(addr => addr.selected);
    if (selectedAddress) {
      selectedAddress.phone = this.newAddress.phone;
      console.log('Mobile number updated in real-time:', {
        selectedAddressId: selectedAddress.id,
        phone: selectedAddress.phone,
        formPhone: this.newAddress.phone
      });
    }
  }

  // Getter to check if selected address is real (not placeholder)
  get hasRealSelectedAddress(): boolean {
    const selectedAddress = this.deliveryAddresses.find(addr => addr.selected);
    return selectedAddress && selectedAddress.address !== 'Please add your delivery address below';
  }

  // Getter for selected address
  get selectedAddress(): any {
    return this.deliveryAddresses.find(addr => addr.selected);
  }

  // Create order before moving to review step
  createOrderBeforeReview(): void {
    // Validation before creating order
    if (this.cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const selectedAddress = this.deliveryAddresses.find(addr => addr.selected);
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    // Check if user is trying to use the default placeholder address
    if (selectedAddress.address === 'Please add your delivery address below') {
      alert('Please add a valid delivery address using the form below before proceeding');
      return;
    }

    if (!this.selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    // Check if mobile number is available
    if (!selectedAddress.phone || selectedAddress.phone.trim() === '') {
      alert('Please enter mobile number for the selected address');
      return;
    }

    this.isCreatingOrder = true;

    // Prepare order payload to match API structure
    const orderPayload = {
      products: this.cartItems.map(item => ({
        product: item.id,
        count: item.quantity
      })),
      address: [{
        pincode: parseInt(selectedAddress.pincode) || 0,
        name: selectedAddress.name,
        mobile: selectedAddress.phone,
        address: selectedAddress.address,
        city: selectedAddress.city,
        email: selectedAddress.email,
        state: selectedAddress.state,
        _id: selectedAddress.id
      }],
      order_type: this.selectedPaymentMethod === 'cod' ? 'COD' : 'Pre-Paid',
      payment_amount: {
        product_amount: this.subtotal,
        delivery_amount: this.shipping,
        total_amount: this.grandTotal
      }
    };

    console.log('Creating order with payload:', orderPayload);

    // Call create order API
    this.apiService.createOrder(orderPayload).subscribe(
      (response: any) => {
        console.log('Order created successfully:', response);
        this.isCreatingOrder = false;
        this.orderCreated = true;
        
        // Store order response for review
        this.selectedOrder = response;
        
        // Move to step 4 (review) after successful order creation
        this.currentStep = 4;
        
        // Don't clear cart yet - let user review first
        // this.cartItems = [];
        // this.cartService.clearCart();
      },
      (error) => {
        console.error('Error creating order:', error);
        this.isCreatingOrder = false;
        alert(`Error creating order: ${error.error?.message || error.message || 'Please try again.'}`);
      }
    );
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
    // Validate mobile number when moving from step 2 (delivery) to step 3 (payment)
    if (this.currentStep === 2) {
      const selectedAddress = this.deliveryAddresses.find(addr => addr.selected);
      console.log('Validating mobile number:', {
        selectedAddress: selectedAddress,
        formPhone: this.newAddress.phone,
        addressPhone: selectedAddress?.phone
      });
      
      if (selectedAddress && selectedAddress.address !== 'Please add your delivery address below') {
        // Update mobile number from form to selected address
        if (this.newAddress.phone && this.newAddress.phone.trim() !== '') {
          selectedAddress.phone = this.newAddress.phone;
          console.log('Updated selected address phone:', selectedAddress.phone);
        }
        
        // Check if mobile number is available in the selected address
        if (!selectedAddress.phone || selectedAddress.phone.trim() === '') {
          console.log('Mobile number validation failed:', selectedAddress.phone);
          alert('Please enter mobile number for the selected address');
          return;
        }
        
        console.log('Mobile number validation passed:', selectedAddress.phone);
      }
    }

    // Create order when moving from step 3 (payment) to step 4 (review)
    if (this.currentStep === 3) {
      this.createOrderBeforeReview();
      return;
    }
    
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
    
    // Prefill the new address form with selected address details
    const selectedAddress = this.deliveryAddresses.find(addr => addr.selected);
    if (selectedAddress && selectedAddress.address !== 'Please add your delivery address below') {
      this.newAddress = {
        email: selectedAddress.email || '',
        pincode: selectedAddress.pincode || '',
        name: selectedAddress.name || '',
        phone: selectedAddress.phone || '', // This will be empty if API doesn't return mobile
        address: selectedAddress.address || '',
        state: selectedAddress.state || '',
        city: selectedAddress.city || ''
      };
    }
  }

  addNewAddress(): void {
    if (!this.isNewAddressValid()) {
      alert('Please fill in all required fields');
      return;
    }

    this.isAddingAddress = true;
    const addressPayload = {
      name: this.newAddress.name,
      mobile: this.newAddress.phone, // API expects mobile field
      address: this.newAddress.address,
      city: this.newAddress.city,
      state: this.newAddress.state,
      pincode: this.newAddress.pincode,
      email: this.newAddress.email
    };

    this.apiService.addAddress(addressPayload).subscribe(
      (response: any) => {
        console.log('Address added successfully:', response);
        alert('Address added successfully!');
        
        // Clear form
        this.newAddress = {
          email: '',
          pincode: '',
          name: '',
          phone: '',
          address: '',
          state: '',
          city: ''
        };
        this.pincodeResponse = null;
        
        // Call get address API again to refresh the address list
        this.loadAddresses();
        this.isAddingAddress = false;
      },
      (error) => {
        console.error('Error adding address:', error);
        alert('Error adding address. Please try again.');
        this.isAddingAddress = false;
      }
    );
  }

  updateAddress(): void {
    const selectedAddress = this.deliveryAddresses.find(addr => addr.selected);
    if (!selectedAddress) {
      alert('Please select an address to update');
      return;
    }

    if (!this.isNewAddressValid()) {
      alert('Please fill in all required fields');
      return;
    }

    this.isUpdatingAddress = true;
    const addressPayload = {
      addressId: selectedAddress.id,
      name: this.newAddress.name,
      mobile: this.newAddress.phone, // API expects mobile field
      address: this.newAddress.address,
      city: this.newAddress.city,
      state: this.newAddress.state,
      pincode: this.newAddress.pincode,
      email: this.newAddress.email
    };

    this.apiService.updateAddress(addressPayload).subscribe(
      (response: any) => {
        console.log('Address updated successfully:', response);
        alert('Address updated successfully!');
        
        // Clear form
        this.newAddress = {
          email: '',
          pincode: '',
          name: '',
          phone: '',
          address: '',
          state: '',
          city: ''
        };
        this.pincodeResponse = null;
        
        // Call get address API again to refresh the address list
        this.loadAddresses();
        this.isUpdatingAddress = false;
      },
      (error) => {
        console.error('Error updating address:', error);
        alert('Error updating address. Please try again.');
        this.isUpdatingAddress = false;
      }
    );
  }

  checkPincode(): void {
    if (!this.newAddress.pincode) {
      alert('Please enter a pincode');
      return;
    }

    if (this.newAddress.pincode.length !== 6 || !/^\d+$/.test(this.newAddress.pincode)) {
      alert('Please enter a valid 6-digit pincode');
      return;
    }

    console.log('Checking pincode:', this.newAddress.pincode);
    
    // Call delivery availability API
    this.apiService.getDeliveryAvailability(this.newAddress.pincode).subscribe(
      (response: any) => {
        console.log('Pincode response:', response);
        this.pincodeResponse = response;
        
        if (response && response.available) {
          // Auto-fill city and state from response
          if (response.city) this.newAddress.city = response.city;
          if (response.state) this.newAddress.state = response.state;
          
          alert(`✅ Delivery available in your area!\nCity: ${response.city || 'N/A'}\nState: ${response.state || 'N/A'}\nDelivery Time: ${response.deliveryTime || '2-3 days'}`);
        } else {
          alert('❌ Delivery not available in this pincode area. Please try a different pincode.');
        }
      },
      (error) => {
        console.error('Error checking pincode:', error);
        alert('Error checking pincode. Please try again.');
      }
    );
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
    // This method is no longer used as order creation happens in nextStep()
    // Keeping for backward compatibility
    console.log('submitOrder called - redirecting to createOrderBeforeReview');
    this.createOrderBeforeReview();
  }

  // Finalize order after review
  finalizeOrder(): void {
    // Clear cart after user confirms the order
    this.cartItems = [];
    this.cartService.clearCart();
    
    // Reset form
    this.currentStep = 1;
    this.hearAboutUs = [];
    this.orderReason = '';
    this.orderCreated = false;
    this.selectedOrder = null;
    
    // Show success message
    alert('Order finalized successfully! Thank you for your purchase.');
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
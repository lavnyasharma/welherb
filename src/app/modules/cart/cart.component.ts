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
  showThankYouMessage = false;

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

  // COD selection
  isCODSelected = false;

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

  // Payment response data
  paymentResponse: any = null;
  paymentLinks: any = null;

  // Polling variables
  private pollingInterval: any = null;
  private pollingCount = 0;
  private maxPollingAttempts = 30; // 30 attempts * 2 seconds = 60 seconds max

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.selectedPaymentMethod = 'googlepay';
    this.loadCartItems();
    this.loadAddresses();
    
    // Check if we're returning from a payment
    this.checkPaymentStatusOnReturn();
    
    setTimeout(() => {
      console.log('Current addresses after timeout:', this.deliveryAddresses);
    }, 1000);
  }

  ngOnDestroy(): void {
    // Clean up polling interval if it exists
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  private loadCartItems(): void {
    this.cartService.cartItems$.subscribe((cartItemIds) => {
      console.log('Cart items updated:', cartItemIds);
      this.apiService.getCartItems().subscribe(
        (response: any[]) => {
          this.cartItems = response
            .filter(item => item?.product || item?.name)
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
            phone: addr.mobile || addr.phone || '',
            email: addr.email || '',
            selected: index === 0
          }));
          console.log('Mapped addresses:', this.deliveryAddresses);
        } else {
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

  refreshAddresses(): void {
    console.log('Manually refreshing addresses...');
    this.loadAddresses();
  }

  updateMobileNumber(): void {
    const selectedAddress = this.deliveryAddresses.find(addr => addr.selected);
    if (selectedAddress && this.newAddress.phone.trim() !== '') {
      selectedAddress.phone = this.newAddress.phone;
      console.log('Mobile number updated for selected address:', selectedAddress);
    }
  }

  // Format mobile number to ensure it's 10 digits only
  formatMobileNumber(): void {
    // Remove any non-digit characters
    this.newAddress.phone = this.newAddress.phone.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (this.newAddress.phone.length > 10) {
      this.newAddress.phone = this.newAddress.phone.substring(0, 10);
    }
  }

  // Validate mobile number input to allow only digits
  validateMobileNumberInput(event: KeyboardEvent): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    // Allow only digits (0-9)
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  // Format phone number for display (ensure only 10 digits)
  formatPhoneNumberForDisplay(phone: string): string {
    if (!phone) return '';
    // Remove any non-digit characters and limit to 10 digits
    const cleanPhone = phone.replace(/\D/g, '').substring(0, 10);
    return cleanPhone;
  }

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

  get hasRealSelectedAddress(): boolean {
    const selectedAddress = this.deliveryAddresses.find(addr => addr.selected);
    return selectedAddress && selectedAddress.address !== 'Please add your delivery address below';
  }

  get selectedAddress(): any {
    return this.deliveryAddresses.find(addr => addr.selected);
  }

  nextStep(): void {
    if (this.currentStep === 2) {
      this.createOrderBeforeReview();
      return;
    }
    
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  async createOrderBeforeReview(): Promise<void> {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const selectedAddress = this.deliveryAddresses.find(addr => addr.selected);
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    if (selectedAddress.address === 'Please add your delivery address below') {
      alert('Please add a valid delivery address using the form below before proceeding');
      return;
    }

    if (!selectedAddress.phone || selectedAddress.phone.trim() === '') {
      alert('Please enter mobile number for the selected address');
      return;
    }

    this.isCreatingOrder = true;

    // Determine order type based on COD selection
    const orderType = this.isCODSelected ? 'COD' : 'Pre-Paid';

    // Prepare order payload with full address object
    const orderPayload = {
      products: this.cartItems.map(item => ({
        product: item.id,
        count: item.quantity
      })),
      address: {
        pincode: parseInt(selectedAddress.pincode) || 0,
        name: selectedAddress.name,
        mobile: selectedAddress.phone,
        address: selectedAddress.address,
        city: selectedAddress.city,
        email: selectedAddress.email || '',
        state: selectedAddress.state,
        _id: selectedAddress.id
      },
      order_type: orderType,
      payment_amount: {
        product_amount: this.subtotal,
        delivery_amount: this.shipping,
        total_amount: this.grandTotal
      }
    };

    console.log('Creating order with payload:', orderPayload);

    try {
      // Call the create order API
      const response = await this.apiService.createOrder(orderPayload).toPromise();
      console.log('Order created successfully:', response);
      this.selectedOrder = response;
      
      // Handle COD orders (no payment redirect needed)
      if (this.isCODSelected) {
        this.isCreatingOrder = false;
        this.orderCreated = true;
        this.currentStep = 4;
        return;
      }
      
      // Handle Pre-Paid orders (show payment links)
      if (response && response.links) {
        this.paymentResponse = response;
        this.paymentLinks = response.links;
        this.isCreatingOrder = false;
        this.currentStep = 3; // Move to payment step
        
        // Start polling every 2 seconds
        this.startOrderStatusPolling(response.order_id);
      } else {
        throw new Error('Invalid payment response from server');
      }
    } catch (error: any) {
      console.error('Error creating order:', error);
      this.isCreatingOrder = false;
      alert(`Error creating order: ${error.error?.message || error.message || 'Please try again.'}`);
    }
  }

  // Check payment status when returning from payment gateway
  checkPaymentStatusOnReturn(): void {
    const pendingOrderId = localStorage.getItem('pendingOrderId');
    if (pendingOrderId) {
      // Remove the pending order ID from localStorage
      localStorage.removeItem('pendingOrderId');
      
      // Start polling every 2 seconds
      this.startOrderStatusPolling(pendingOrderId);
    }
  }

  // Start polling for order status every 2 seconds
  private startOrderStatusPolling(orderId: string): void {
    this.pollingCount = 0;
    
    // Clear any existing interval
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
    
    // Start polling every 2 seconds
    this.pollingInterval = setInterval(() => {
      this.pollingCount++;
      
      // Stop polling after max attempts
      if (this.pollingCount > this.maxPollingAttempts) {
        clearInterval(this.pollingInterval);
        this.isCreatingOrder = false;
        console.log('Stopped polling after max attempts');
        return;
      }
      
      this.checkOrderStatus(orderId);
    }, 2000);
  }

  // Map the order response data
  private mapOrderResponse(order: any): void {
    if (order && order._id) {
      this.selectedOrder = {
        _id: order._id,
        order_id: order.order_id,
        status: order.status,
        products: order.products,
        address: order.address,
        tracking_history: order.tracking_history,
        upload_wbn: order.upload_wbn,
        shipping_id: order.shipping_id,
        order_type: order.order_type,
        payment_amount: order.payment_amount,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      };
      
      console.log('Mapped order response:', this.selectedOrder);
    }
  }

  // Check order status after payment redirect
  checkOrderStatusAfterPayment(): void {
    // Deprecated - use checkPaymentStatusOnReturn instead
  }

  private checkOrderStatus(orderId: string): void {
    // This method has been moved to the new polling implementation
    this.apiService.getOrderById(orderId).subscribe(
      (order: any) => {
        console.log('Order status check:', order);
        
        // Map the response data
        this.mapOrderResponse(order);
        
        // Check if order is confirmed
        if (order.status === 'Ordered' || order.status === 'PAID' || order.status === 'COMPLETED') {
          // Order confirmed - stop polling and show confirmation
          clearInterval(this.pollingInterval);
          this.isCreatingOrder = false;
          this.orderCreated = true;
          this.selectedOrder = order;
          this.currentStep = 4;
          
          // Clear cart items
          this.cartItems = [];
          this.cartService.clearCart();
        } else if (order.status === 'FAILED' || order.status === 'CANCELLED') {
          // Order failed - stop polling and show error
          clearInterval(this.pollingInterval);
          this.isCreatingOrder = false;
          alert('Order was not successful. Please try again.');
        }
        // For pending statuses, continue polling
      },
      (error) => {
        console.error('Error checking order status:', error);
        // Continue polling even if there's an error
      }
    );
  }

  private handlePaymentRedirect(paymentResponse: any): void {
    // Deprecated - handling is now done directly in createOrderBeforeReview
  }

  // Verify payment status with the backend
  private verifyPaymentStatus(orderId: string): void {
    // Deprecated - use the new polling implementation instead
  }

  // Check payment status with the backend
  private checkPaymentStatus(orderId: string): void {
    // Deprecated - use the new polling implementation instead
  }

  // Open payment link
  openPaymentLink(linkType: string): void {
    if (this.paymentLinks && this.paymentLinks[linkType]) {
      window.open(this.paymentLinks[linkType], '_blank');
      
      // Start polling every 2 seconds
      if (this.paymentResponse && this.paymentResponse.order_id) {
        this.startOrderStatusPolling(this.paymentResponse.order_id);
      }
    }
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
    return 200;
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

  increaseQuantity(itemId: string): void {
    const item = this.cartItems.find(item => item.id === itemId);
    if (item) {
      item.quantity++;
    }
  }

  decreaseQuantity(itemId: string): void {
    const item = this.cartItems.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(id: string): void {
    this.cartService.removeFromCart(id);
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }

  get stepTitles(): string[] {
    return ['Offers', 'Delivery', 'Payment', 'Review'];
  }

  get currentStepTitle(): string {
    const titles = ['Offers', 'Delivery', 'Payment', 'FAQs'];
    return titles[this.currentStep - 1];
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

    console.log('Applying discount code:', this.discountCode);
    
    const validCodes = ['SAVE10', 'WELCOME20', 'FIRST50'];
    
    if (validCodes.includes(this.discountCode.toUpperCase())) {
      alert('Discount code applied successfully!');
    } else {
      alert('Invalid discount code. Please try again.');
    }
  }

  selectAddress(addressId: number): void {
    this.deliveryAddresses.forEach(addr => {
      addr.selected = addr.id === addressId;
    });
    
    const selectedAddress = this.deliveryAddresses.find(addr => addr.selected);
    if (selectedAddress && selectedAddress.address !== 'Please add your delivery address below') {
      this.newAddress = {
        email: selectedAddress.email || '',
        pincode: selectedAddress.pincode || '',
        name: selectedAddress.name || '',
        phone: selectedAddress.phone || '',
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
      mobile: this.newAddress.phone,
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
      mobile: this.newAddress.phone,
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
    
    this.apiService.getDeliveryAvailability(this.newAddress.pincode).subscribe(
      (response: any) => {
        console.log('Pincode response:', response);
        this.pincodeResponse = response;
        
        if (response && response.available) {
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

  onCODSelectionChange(): void {
    console.log('COD selection changed:', this.isCODSelected);
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
    console.log('submitOrder called - creating order');
    if (this.currentStep === 2) {
      this.createOrderBeforeReview();
    } else if (this.currentStep === 4) {
      this.finalizeOrder();
    }
  }

  // Finalize order after feedback submission
  finalizeOrder(): void {
    this.cartItems = [];
    this.cartService.clearCart();
    
    this.currentStep = 1;
    this.hearAboutUs = [];
    this.orderReason = '';
    this.orderCreated = false;
    this.selectedOrder = null;
    
    alert('Order finalized successfully! Thank you for your purchase.');
  }

  // Submit feedback after order completion
  submitFeedback(): void {
    console.log('Feedback submitted:', {
      hearAboutUs: this.hearAboutUs,
      orderReason: this.orderReason
    });
    
    // Here you would typically send the feedback to your backend
    // For now, we'll just show an alert and reset the form
    this.showThankYouMessage = true;
    
    // Reset feedback form
    this.hearAboutUs = [];
    this.orderReason = '';
    
    // Hide thank you message after 3 seconds
    setTimeout(() => {
      this.showThankYouMessage = false;
      // Reset the entire order flow
      this.resetOrderFlow();
    }, 3000);
  }

  // Reset the order flow after feedback submission
  resetOrderFlow(): void {
    this.cartItems = [];
    this.cartService.clearCart();
    
    this.currentStep = 1;
    this.orderCreated = false;
    this.selectedOrder = null;
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

  checkout(): void {
    if (this.currentStep < this.totalSteps) {
      this.nextStep();
    } else {
      this.submitOrder();
    }
  }
}
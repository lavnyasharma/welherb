import { Component, OnInit, HostListener, OnDestroy } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { ToastrService } from "ngx-toastr";
import { ProfileService, UserProfile } from "../../../services/profile.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit, OnDestroy {
  // Define possible tab values as string literals
  readonly TAB_PROFILE = "profile" as const;
  readonly TAB_ORDERS = "orders" as const;
  readonly TAB_ORDER_DETAILS = "order-details" as const;

  // Define the type for activeTab
  activeTab: "profile" | "orders" | "order-details" = this.TAB_PROFILE;

  genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  heightOptions: { label: string; value: string }[] = [];
  weightOptions: { label: string; value: number }[] = [];

  savedProfiles: UserProfile[] = [];
  private profilesSub: Subscription | undefined;

  constructor(
    private apiService: ApiService,
    private toastService: ToastrService,
    private profileService: ProfileService
  ) {}
  // Modal state
  showModal: "gender" | "height" | "weight" | null = null;
  heightFeet: number | null = null;
  heightInches: number | null = null;

  // Profile data
  selectedGender: string = "male";
  selectedHeight: string = "";
  selectedWeight: string = "";

  profilePicture: string | null = "https://i.pravatar.cc/300";

  // Orders data
  orders: any[] = [];
  selectedOrder: any = null;
  isLoadingOrders = false;

  // Password data
  passwordData = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  // Profile form data
  profileData = {
    id: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    height: "",
    weight: "",
    gender: "",
  };

  // Current selected profile
  selectedProfile: any = null;
  showProfileDropdown = false;

  // Toggle for Switch Profile accordion
  isSwitchProfileExpanded = false;

  // Modal states
  showAddMoreModal = false;
  showSwitchProfileModal = false;

  // New address data for Add More modal
  newAddress = {
    gender: "",
    height: "",
    weight: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    area: "",
    landmark: "",
    pincode: "",
    city: "",
  };

  // Saved profiles for Switch Profile


  ngOnInit(): void {
    this.generateOptions();
    this.getUserProfile();

    // Subscribe to saved profiles from service
    this.profilesSub = this.profileService.savedProfiles$.subscribe(
      (profiles) => {
        this.savedProfiles = profiles;
      }
    );

    // Subscribe to selected profile to update UI if changed externally
    this.profileService.selectedProfile$.subscribe((profile) => {
      if (profile) {
        this.selectedProfile = profile;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.profilesSub) {
      this.profilesSub.unsubscribe();
    }
  }

  generateOptions(): void {
    // Generate Height Options (4'0" to 7'0")
    for (let f = 4; f <= 7; f++) {
      for (let i = 0; i < 12; i++) {
        if (f === 7 && i > 0) break;
        const val = `${f}.${i}`;
        this.heightOptions.push({ label: `${f}' ${i}"`, value: val });
      }
    }

    // Generate Weight Options (30kg to 150kg)
    for (let w = 30; w <= 150; w++) {
      this.weightOptions.push({ label: `${w} kg`, value: w });
    }
  }

  // Handle profile picture upload
  openImageUpload(): void {
    // Create a file input element
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // Update the profile picture
          if (this.selectedProfile) {
            this.selectedProfile.avatar = e.target.result;
          }
          // Here you would typically upload the image to your server
          // and update the user's profile
        };
        reader.readAsDataURL(file);
      }
    };

    // Trigger the file selection dialog
    input.click();
  }

  // Modal methods
  openModal(modalType: "gender" | "height" | "weight"): void {
    this.showModal = modalType;

    // Initialize height fields if opening height modal
    if (modalType === "height" && this.selectedHeight) {
      const [feet, inches] = this.selectedHeight.split(".").map(Number);
      this.heightFeet = feet;
      this.heightInches = inches || 0;
    }
  }

  closeModal(): void {
    this.showModal = null;
  }

  selectOption(type: "gender", value: string): void {
    if (type === "gender") {
      this.selectedGender = value;
    }
    this.closeModal();
  }

  saveHeight(): void {
    if (this.heightFeet !== null && this.heightInches !== null) {
      this.selectedHeight = `${this.heightFeet}.${this.heightInches}`;
      this.closeModal();
    }
  }

  saveWeight(): void {
    // The weight is already bound via ngModel
    this.closeModal();
  }

  getUserProfile(): void {
    this.apiService.getUserProfile().subscribe({
      next: (res: any) => {
        this.profileData = {
          fullName: res.name || "",
          email: res.email || "",
          phone: res.mobile || "",
          address: res.address || "",
          pincode: res.pincode || "",
          height: res.height || "",
          weight: res.weight || "",
          gender: res.gender || "",
          // Store ID for delete operation
          id: res._id || res.id,
        } as any;

        if (res.profilePicture) {
          this.profilePicture = res.profilePicture;
        }

        // Populate saved profiles from API and Sync Service
        if (res.profiles && Array.isArray(res.profiles)) {
          const profiles = res.profiles.map((p: any) => ({
            id: p._id,
            name: p.name,
            email: p.email,
            avatar: "https://i.pravatar.cc/100?u=" + (p.email || p.name),
          }));
          this.profileService.setProfiles(profiles);
        }
      },
      error: (err) => {
        console.error("Error loading profile:", err);
        this.toastService.error("Failed to load profile");
      },
    });
  }

  selectTab(tabName: "profile" | "orders" | "order-details"): void {
    this.activeTab = tabName;

    if (tabName === this.TAB_ORDERS) {
      this.loadOrders();
    }
  }

  // Open Add More modal
  openAddMoreModal(): void {
    this.showAddMoreModal = true;
  }

  // Close Add More modal
  closeAddMoreModal(): void {
    this.showAddMoreModal = false;
  }

  // Save address from modal (Now acts as Save New Profile)
  saveAddress(): void {
    if (
      !this.newAddress.name ||
      !this.newAddress.phone ||
      !this.newAddress.address ||
      !this.newAddress.pincode ||
      !this.newAddress.city
    ) {
      this.toastService.error("Please fill all required fields");
      return;
    }

    // Construct payload as per requested cURL structure
    const fullAddress = [
      this.newAddress.address,
      this.newAddress.landmark,
      this.newAddress.area,
    ]
      .filter(Boolean)
      .join(", ");

    const payload = {
      name: this.newAddress.name,
      height: this.newAddress.height ? this.newAddress.height.toString() : "",
      weight: this.newAddress.weight,
      gender: this.newAddress.gender,
      email: this.newAddress.email,
      mobile: this.newAddress.phone,
      address: {
        pincode: Number(this.newAddress.pincode),
        name: this.newAddress.name,
        mobile: this.newAddress.phone,
        address: fullAddress,
        city: this.newAddress.city,
        email: this.newAddress.email,
        // State is not in the form, defaulting or omitting if backend handles it
        // If strictly required, might need to add field or default.
        // cURL had "Maharashtra". I will check if pin code API is used to fetch state,
        // otherwise I'll leave it empty or map from city if possible.
        // For now, I will omit 'state' if not present in newAddress,
        // or effectively it might be handled by backend.
        state: "",
      },
    };

    console.log("Saving new profile:", payload);

    this.apiService.addUserProfile(payload).subscribe({
      next: (res: any) => {
        this.toastService.success("Profile added successfully!");

        // Add to saved profiles list via Service
        const newProfile = {
          id: res.id || res._id || Date.now().toString(),
          name: this.newAddress.name,
          email: this.newAddress.email,
          avatar:
            "https://i.pravatar.cc/100?u=" +
            (this.newAddress.email || this.newAddress.name),
        };

        this.profileService.addProfile(newProfile);

        this.closeAddMoreModal();

        // Reset form
        this.newAddress = {
          gender: "",
          height: "",
          weight: "",
          name: "",
          phone: "",
          email: "",
          address: "",
          area: "",
          landmark: "",
          pincode: "",
          city: "",
        };
      },
      error: (err) => {
        console.error("Error adding profile:", err);
        this.toastService.error(err.error?.message || "Failed to add profile");
      },
    });
  }

  // Open Switch Profile modal
  openSwitchProfile(): void {
    this.showSwitchProfileModal = true;
  }

  // Close Switch Profile modal
  closeSwitchProfileModal(): void {
    this.showSwitchProfileModal = false;
  }

  // Switch to selected profile
  switchToProfile(profile: any): void {
    this.profileService.switchProfile(profile);
    this.toastService.success(`Switched to ${profile.name}'s profile`);
    this.closeSwitchProfileModal();

    // Update the form with selected profile data
    this.profileData = {
      ...this.profileData,
      fullName: profile.name,
      email: profile.email,
      id: profile.id,
      // Add other profile fields as needed
    } as any;
  }

  // Toggle profile dropdown
  toggleProfileDropdown(): void {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  // Handle click outside dropdown
  @HostListener("document:click", ["$event"])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest(".profile-dropdown")) {
      this.showProfileDropdown = false;
    }
  }

  // Add new profile - Opens the modal
  addNewProfile(): void {
    this.closeSwitchProfileModal();
    this.openAddMoreModal();
  }

  // Toggle switch profile accordion
  toggleSwitchProfile(): void {
    this.isSwitchProfileExpanded = !this.isSwitchProfileExpanded;
  }

  // Load all orders
  loadOrders(): void {
    this.isLoadingOrders = true;
    this.apiService.getOrders().subscribe({
      next: (response: any) => {
        console.log("Orders loaded:", response);
        this.orders = response.orders || response || [];
        this.isLoadingOrders = false;
      },
      error: (error) => {
        console.error("Error loading orders:", error);
        this.toastService.error("Failed to load orders");
        this.isLoadingOrders = false;
      },
    });
  }

  // View order details
  viewOrderDetails(order: any): void {
    this.apiService.getOrderById(order.orderId || order._id).subscribe({
      next: (response: any) => {
        console.log("Order details:", response);
        this.selectedOrder = response;
        this.activeTab = "order-details";
      },
      error: (error) => {
        console.error("Error loading order details:", error);
        this.toastService.error("Failed to load order details");
      },
    });
  }

  // Get order by ID
  getOrderById(orderId: string): void {
    this.viewOrderDetails({ orderId });
  }

  // Format order status
  getOrderStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      pending: "Pending",
      confirmed: "Confirmed",
      shipped: "In Transit",
      out_for_delivery: "Out for Delivery",
      delivered: "Delivered",
      cancelled: "Cancelled",
      refunded: "Refunded",
    };
    return statusMap[status] || status;
  }

  // Format order date
  formatDate(dateString: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Get status color class
  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      pending: "status-pending",
      confirmed: "status-confirmed",
      shipped: "status-shipped",
      out_for_delivery: "status-shipped",
      delivered: "status-delivered",
      cancelled: "status-cancelled",
      refunded: "status-refunded",
    };
    return statusClasses[status] || "status-pending";
  }

  // Check if order progress step is completed
  isStepCompleted(step: string, currentStatus: string): boolean {
    const statusOrder = [
      "pending",
      "confirmed",
      "shipped",
      "out_for_delivery",
      "delivered",
    ];
    const stepStatusMap: { [key: string]: string } = {
      confirmed: "confirmed",
      transit: "shipped",
      delivery: "out_for_delivery",
    };

    const stepStatus = stepStatusMap[step];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepStatus);

    return currentIndex >= stepIndex;
  }

  // Handle profile picture change
  onProfilePictureChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Save profile changes
  saveChanges(): void {
    const payload = {
      name: this.profileData.fullName,
      email: this.profileData.email,
      mobile: this.profileData.phone,
      address: this.profileData.address,
      pincode: this.profileData.pincode,
      height: this.profileData.height,
      weight: this.profileData.weight,
      gender: this.profileData.gender,
    };

    console.log("Saving profile:", payload);

    this.apiService.updateUserProfile(payload).subscribe({
      next: (res) => {
        this.toastService.success("Profile updated successfully!");
      },
      error: (err) => {
        console.error("Error updating profile:", err);
        this.toastService.error("Failed to update profile");
      },
    });
  }

  // Change password
  changePassword(): void {
    const { currentPassword, newPassword, confirmPassword } = this.passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      this.toastService.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      this.toastService.error("New password and confirm password do not match");
      return;
    }

    if (newPassword.length < 8) {
      this.toastService.error("Password must be at least 8 characters long");
      return;
    }

    const payload = {
      old_password: currentPassword,
      new_password: newPassword,
    };

    this.apiService.changeUserPassword(payload).subscribe({
      next: (res) => {
        this.toastService.success("Password updated successfully!");
        this.passwordData = {
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        };
      },
      error: (err) => {
        console.error("Error updating password:", err);
        this.toastService.error("Failed to update password");
      },
    });
  }

  // Delete profile functionality
  showDeleteModal = false;

  openDeleteModal(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  confirmDelete(): void {
    const profileId = (this.profileData as any).id;
    if (!profileId) {
      this.toastService.error("Cannot delete this profile (ID not found)");
      this.closeDeleteModal();
      return;
    }

    this.apiService.deleteUserProfile(profileId).subscribe({
      next: (res) => {
        this.toastService.success("Profile deleted successfully");
        this.closeDeleteModal();

        // Remove from savedProfiles if it exists there
        this.profileService.deleteProfile(profileId);

        // If we deleted the current view, reload main profile
        // Assuming the main profile cannot be deleted via this specific endpoint
        // or if it is, we logout.
        // But if it's a sub-profile, we should revert to main.

        // Re-fetch main profile to reset view
        this.getUserProfile();
        this.selectedProfile = null;
      },
      error: (err) => {
        console.error("Error deleting profile:", err);
        this.toastService.error(
          err.error?.message || "Failed to delete profile"
        );
        this.closeDeleteModal();
      },
    });
  }

  // Logout
  logout(): void {
    if (confirm("Are you sure you want to logout?")) {
      // Clear local storage or session
      localStorage.clear();
      sessionStorage.clear();

      // Navigate to login or home page
      window.location.href = "/login";

      this.toastService.success("Logged out successfully");
    }
  }
}

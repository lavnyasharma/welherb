import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(
    private apiService: ApiService,
    private toastService: ToastrService
  ) {}

  activeTab: string = 'profile';

  profilePicture: string | null = "https://i.pravatar.cc/300";

  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  // Form data bound with ngModel
  profileData = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
    height: '',
    weight: '',
    gender: ''
  };

  ngOnInit(): void {
    this.getUserProfile();
  }
  getUserProfile(): void {
    this.apiService.getUserProfile().subscribe({
      next: (res: any) => {
        // Prefill data from response
        this.profileData = {
          fullName: res.name || '',
          email: res.email || '',
          phone: res.mobile || '',
          address: res.address || '',
          pincode: res.pincode || '',
          height: res.height || '',
          weight: res.weight || '',
          gender: res.gender || ''
        };
      },
      error: (err) => {
        this.toastService.error('Failed to load profile');
      }
    });
  }

  cartItems = [
    {
      id: 1,
      name: 'Ocean Breeze Pendant',
      subtitle: 'Serenity',
      category: 'Universal',
      price: 1900,
      image: 'https://www.velonna.co/_next/image?url=https%3A%2F%2Fpldwzgpchvgtdycyfaky.supabase.co%2Fstorage%2Fv1%2F%2Fobject%2Fpublic%2Fvelonnabucket%2Fproduct_thumbnails%2F0M1A9178.jpg&w=640&q=75',
      inStock: true,
    },
    {
      id: 2,
      name: 'Spring Flora Tops',
      subtitle: 'Lavender',
      category: 'Universal',
      price: 1800,
      image: 'https://www.velonna.co/_next/image?url=https%3A%2F%2Fpldwzgpchvgtdycyfaky.supabase.co%2Fstorage%2Fv1%2F%2Fobject%2Fpublic%2Fvelonnabucket%2Fproduct_thumbnails%2F0M1A9178.jpg&w=640&q=75',
      inStock: true,
    },
  ];

  selectTab(tabName: string) {
    this.activeTab = tabName;
  }

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

  saveChanges() {
    const payload = {
      name: this.profileData.fullName,
      email: this.profileData.email,
      mobile: this.profileData.phone,
      address: this.profileData.address,
      pincode: this.profileData.pincode,
      height: this.profileData.height,
      weight: this.profileData.weight,
      gender: this.profileData.gender
    };

    console.log(payload);

    this.apiService.updateUserProfile(payload).subscribe(
      res => {
        this.toastService.success('Profile updated!');
      },
      err => {
        this.toastService.error('Error updating profile');
      }
    );
  }

  changePassword() {
    const { currentPassword, newPassword, confirmPassword } = this.passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      this.toastService.error('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      this.toastService.error('New and confirm passwords do not match.');
      return;
    }

    const payload = {
      old_password: currentPassword,
      new_password: newPassword
    };

    this.apiService.changeUserPassword(payload).subscribe({
      next: (res) => {
        this.toastService.success('Password updated successfully!');
        this.passwordData = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        };
      },
      error: (err) => {
        this.toastService.error('Failed to update password');
      }
    });
  }
}

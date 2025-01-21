import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  activeTab: string = 'profile'; // Default to Profile tab
  profilePicture: string | null = "https://i.pravatar.cc/300"; // to store the profile picture URL

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
  cartItems = [
    {
      id: 1,
      name: 'Ocean Breeze Pendant',
      subtitle: 'Serenity',
      category: 'Universal',
      price: 1900,
      image: 'https://www.velonna.co/_next/image?url=https%3A%2F%2Fpldwzgpchvgtdycyfaky.supabase.co%2Fstorage%2Fv1%2F%2Fobject%2Fpublic%2Fvelonnabucket%2Fproduct_thumbnails%2F0M1A9178.jpg&w=640&q=75', // Adjust the image path
      inStock: true,
    },
    {
      id: 2,
      name: 'Spring Flora Tops',
      subtitle: 'Lavender',
      category: 'Universal',
      price: 1800,
      image: 'https://www.velonna.co/_next/image?url=https%3A%2F%2Fpldwzgpchvgtdycyfaky.supabase.co%2Fstorage%2Fv1%2F%2Fobject%2Fpublic%2Fvelonnabucket%2Fproduct_thumbnails%2F0M1A9178.jpg&w=640&q=75', // Adjust the image path
      inStock: true,
    },
  ]

  selectTab(tabName: string) {
    console.log('Selected Tab:', tabName); // Debugging log
    this.activeTab = tabName;
  }

  
}

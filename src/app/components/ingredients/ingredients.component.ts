import { Component } from '@angular/core';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css'
})
export class IngredientsComponent {
  images: { name: string; url: string }[] = [
    { name: 'Image 1', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/black-cardamom%20Background%20Removed%202.png' },
    { name: 'Image 2', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/blackpepper%20Background%20Removed%2011.png' },
    { name: 'Image 3', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/brahmi%201.png' },
    { name: 'Image 4', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/cloves1_5000x%20Background%20Removed%204.png' },
    { name: 'Image 5', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/fennel-seed-whole__53381%20(1)%202%20Background%20Removed%207.png' },
    { name: 'Image 6', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/Final%20ginger%207.png' },
    { name: 'Image 7', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/giloy%204.png' },
    { name: 'Image 8', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/guggul-resin-scaled-1-1536x1152%202%20Background%20Removed%208.png' },
    { name: 'Image 9', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/katira%20gond%20Background%20Removed%205.png' },
    { name: 'Image 10', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/neem%202.png' },
    { name: 'Image 11', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/nutmeg2_macro_1200x1000%20Background%20Removed%203.png' },
    { name: 'Image 12', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/Organic_Ashwagandha_Extract%202%20Background%20Removed%208.png' },
    { name: 'Image 13', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/peppermint3%20Background%20Removed%203.png' },
    { name: 'Image 14', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/pomegranate6%20Background%20Removed%203.png' },
    { name: 'Image 15', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/saffron.%20Background%20Removed%204.png' },
    { name: 'Image 16', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/ustukhudus%201.png' },
    { name: 'Image 17', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/vacha%201.png' },
    { name: 'Image 18', url: 'https://ewsorupyhavslsemnmhd.supabase.co/storage/v1/object/public/welherb/vadarikand%201.png' },

  ];
  
}

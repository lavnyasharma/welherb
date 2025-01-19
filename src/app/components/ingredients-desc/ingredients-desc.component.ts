import { Component } from '@angular/core';

@Component({
  selector: 'app-ingredients-desc',
  templateUrl: './ingredients-desc.component.html',
  styleUrl: './ingredients-desc.component.css'
})
export class IngredientsDescComponent {
  ingredients = [
    {
      name: 'Brimstone',
      image: 'https://wrijpsiiuvmeqaeklnqi.supabase.co/storage/v1/object/sign/new/neem%202.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJuZXcvbmVlbSAyLnBuZyIsImlhdCI6MTczNzMwNTQ2OSwiZXhwIjoyMDUyNjY1NDY5fQ.AZdbp8QP6g9nNpavus_ZhbpALaEXuxmmYRDwaRU1nj8&t=2025-01-19T16%3A51%3A09.772Z', // Dummy CDN Image
      description: 'A sulfur-based mineral with numerous health benefits.',
      flipped: false,
    },
    {
      name: 'Neem',
      image: 'https://wrijpsiiuvmeqaeklnqi.supabase.co/storage/v1/object/sign/new/brimestone_gandhak%202.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJuZXcvYnJpbWVzdG9uZV9nYW5kaGFrIDIucG5nIiwiaWF0IjoxNzM3MzA2NjYxLCJleHAiOjE3Njg4NDI2NjF9.WN136KOCj6i8CV7v8vxfkGAsFjU_LO-wE5svL8MYq6o&t=2025-01-19T17%3A11%3A01.805Z',
      description: 'Known for its antibacterial and purifying properties.',
      flipped: false,
    },
    {
      name: 'Ashwagandha',
      image: 'https://wrijpsiiuvmeqaeklnqi.supabase.co/storage/v1/object/sign/new/Organic_Ashwagandha_Extract%202%20Background%20Removed%208.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJuZXcvT3JnYW5pY19Bc2h3YWdhbmRoYV9FeHRyYWN0IDIgQmFja2dyb3VuZCBSZW1vdmVkIDgucG5nIiwiaWF0IjoxNzM3MzA2NjkzLCJleHAiOjE3Njg4NDI2OTN9.tDT8VQsF-acJvUDS6_Vu3ps1WubUDbyrugEf_1Ixs5o&t=2025-01-19T17%3A11%3A33.213Z',
      description: 'Helps in reducing stress and boosting immunity.',
      flipped: false,
    },
    {
      name: 'Guduchi',
      image: 'https://wrijpsiiuvmeqaeklnqi.supabase.co/storage/v1/object/sign/new/brimestone_gandhak%202.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJuZXcvYnJpbWVzdG9uZV9nYW5kaGFrIDIucG5nIiwiaWF0IjoxNzM3MzA2NjYxLCJleHAiOjE3Njg4NDI2NjF9.WN136KOCj6i8CV7v8vxfkGAsFjU_LO-wE5svL8MYq6o&t=2025-01-19T17%3A11%3A01.805Z',
      description: 'An Ayurvedic herb that supports vitality.',
      flipped: false,
    },
    {
      name: 'Sacred Fig',
      image: 'https://wrijpsiiuvmeqaeklnqi.supabase.co/storage/v1/object/sign/new/neem%202.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJuZXcvbmVlbSAyLnBuZyIsImlhdCI6MTczNzMwNTQ2OSwiZXhwIjoyMDUyNjY1NDY5fQ.AZdbp8QP6g9nNpavus_ZhbpALaEXuxmmYRDwaRU1nj8&t=2025-01-19T16%3A51%3A09.772Z', // Dummy CDN Image
      description: 'A revered plant with a calming effect.',
      flipped: false,
    },
    {
      name: 'Gum Arabic',
      image: 'https://wrijpsiiuvmeqaeklnqi.supabase.co/storage/v1/object/sign/new/Organic_Ashwagandha_Extract%202%20Background%20Removed%208.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJuZXcvT3JnYW5pY19Bc2h3YWdhbmRoYV9FeHRyYWN0IDIgQmFja2dyb3VuZCBSZW1vdmVkIDgucG5nIiwiaWF0IjoxNzM3MzA2NjkzLCJleHAiOjE3Njg4NDI2OTN9.tDT8VQsF-acJvUDS6_Vu3ps1WubUDbyrugEf_1Ixs5o&t=2025-01-19T17%3A11%3A33.213Z',
      description: 'A natural gum used for its soothing properties.',
      flipped: false,
    },
  ];

  toggleFlip(ingredient: any) {
    ingredient.flipped = !ingredient.flipped;
  }
}

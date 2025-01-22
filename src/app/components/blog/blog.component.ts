import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  blogs = [
    {
      title: '5 Simple Ways to Live Healthier',
      description: 'Discover easy tips to improve your daily health routine.',
      image: 'https://wrijpsiiuvmeqaeklnqi.supabase.co/storage/v1/object/sign/new/doctor.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJuZXcvZG9jdG9yLnBuZyIsImlhdCI6MTczNzU1NjYwNiwiZXhwIjoxNzY5MDkyNjA2fQ.lSEl3AP3LkDZqyiRxRYBME8-5J8Sps2DbPMmGHj27MM&t=2025-01-22T14%3A36%3A46.755Z',
    },
    {
      title: '5 Simple Ways to Live Healthier',
      description: 'Discover easy tips to improve your daily health routine.',
      image: 'https://wrijpsiiuvmeqaeklnqi.supabase.co/storage/v1/object/sign/new/doctor.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJuZXcvZG9jdG9yLnBuZyIsImlhdCI6MTczNzU1NjYwNiwiZXhwIjoxNzY5MDkyNjA2fQ.lSEl3AP3LkDZqyiRxRYBME8-5J8Sps2DbPMmGHj27MM&t=2025-01-22T14%3A36%3A46.755Z',
    },
    {
      title: '5 Simple Ways to Live Healthier',
      description: 'Discover easy tips to improve your daily health routine.',
      image: 'https://wrijpsiiuvmeqaeklnqi.supabase.co/storage/v1/object/sign/new/doctor.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJuZXcvZG9jdG9yLnBuZyIsImlhdCI6MTczNzU1NjYwNiwiZXhwIjoxNzY5MDkyNjA2fQ.lSEl3AP3LkDZqyiRxRYBME8-5J8Sps2DbPMmGHj27MM&t=2025-01-22T14%3A36%3A46.755Z',
    },
  ];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
}

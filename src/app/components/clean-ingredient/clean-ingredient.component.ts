import { Component } from '@angular/core';

@Component({
  selector: 'app-clean-ingredient',
  templateUrl: './clean-ingredient.component.html',
  styleUrl: './clean-ingredient.component.css'
})
export class CleanIngredientComponent {
  features = [
    {
      icon: 'https://wrijpsiiuvmeqaeklnqi.supabase.co/storage/v1/object/sign/new/Group%20634.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNTNkMmE3MS00ODk1LTRmN2YtYWExYS01ZjA1ZDhlYWE2YTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJuZXcvR3JvdXAgNjM0LnN2ZyIsImlhdCI6MTc2MTIwNDgxOCwiZXhwIjoxNzkyNzQwODE4fQ.qZiqjl-T2iQppEpxnXRDfsbw3R65UghSrhlIyWQautE',
      title: 'Ayush Certified'
    },
    {
      icon: 'https://wrijpsiiuvmeqaeklnqi.supabase.co/storage/v1/object/sign/new/Group%20638.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNTNkMmE3MS00ODk1LTRmN2YtYWExYS01ZjA1ZDhlYWE2YTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJuZXcvR3JvdXAgNjM4LnN2ZyIsImlhdCI6MTc2MTIwNDgyNSwiZXhwIjoxNzkyNzQwODI1fQ.8AIIQMWuWB5fCLyvztVsM_IASWuUl5s8W-KuTnQkSWs',
      title: '100% Ayurvedic'
    },
    {
      icon: 'https://wrijpsiiuvmeqaeklnqi.supabase.co/storage/v1/object/sign/new/Group%20639.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNTNkMmE3MS00ODk1LTRmN2YtYWExYS01ZjA1ZDhlYWE2YTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJuZXcvR3JvdXAgNjM5LnN2ZyIsImlhdCI6MTc2MTIwNDgzMSwiZXhwIjoxNzkyNzQwODMxfQ.oIDHTtYuzUVAEUdLFjp6v5Lh7XZg8pcsmba_-p-7LGs',
      title: 'No Toxins'
    },
    {
      icon: 'https://wrijpsiiuvmeqaeklnqi.supabase.co/storage/v1/object/sign/new/Group%20647.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNTNkMmE3MS00ODk1LTRmN2YtYWExYS01ZjA1ZDhlYWE2YTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJuZXcvR3JvdXAgNjQ3LnN2ZyIsImlhdCI6MTc2MTIwNDgzNywiZXhwIjoxNzkyNzQwODM3fQ.NBaSyWdeTfKrMuQVFUUzyKbV_FccSd2ul0K6YvBOYk8',
      title: 'Non-Addictive'
    },
    {
      icon: 'https://wrijpsiiuvmeqaeklnqi.supabase.co/storage/v1/object/sign/new/Group%20648.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNTNkMmE3MS00ODk1LTRmN2YtYWExYS01ZjA1ZDhlYWE2YTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJuZXcvR3JvdXAgNjQ4LnN2ZyIsImlhdCI6MTc2MTIwNDg0NCwiZXhwIjoxNzkyNzQwODQ0fQ.6T_cpMd-GuKg9Va60rGkoJ2oRptiWUxuYTXJG0dOml8',
      title: 'Lab Tested'
    },
    {
      icon: 'https://wrijpsiiuvmeqaeklnqi.supabase.co/storage/v1/object/sign/new/Group%20649.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jNTNkMmE3MS00ODk1LTRmN2YtYWExYS01ZjA1ZDhlYWE2YTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJuZXcvR3JvdXAgNjQ5LnN2ZyIsImlhdCI6MTc2MTIwNDg1OCwiZXhwIjoxNzkyNzQwODU4fQ.nj9lDHCbxsHmcTAQx9dAy4cdpunE-jMai4wAlISq-wo',
      title: 'GMP Certified'
    }
  ];
}
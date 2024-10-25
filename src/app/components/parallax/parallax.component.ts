import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.scss']
})
export class ParallaxComponent implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    // Create a timeline for smooth parallax animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.parallax-container', // Element to trigger the animation
        start: 'top top', // Start when the top of the element hits the top of the viewport
        end: 'bottom top', // End when the bottom of the element hits the top of the viewport
        scrub: 1.5, // Smoother scroll-triggered animation (lower value = smoother)
        pin: true, // Pin the section until the parallax animation is complete
        anticipatePin: 1, // Add smoother pinning behavior
        onUpdate: (self) => {
          if (self.progress === 1) {
            document.body.style.overflow = 'auto'; // Enable scroll after animation
          }
        }
      }
    });

    // Smooth parallax animation for "Welherb" text
    tl.fromTo('.large-welherb', 
      { opacity: 0.2 }, // Start with lower opacity for a smoother fade-in
      { 
        opacity: 1, 
        duration: 3, // Increased duration for smoothness
        ease: 'power3.inOut' // Smoother easing function
      }
    );

    // Smooth movement of large "Welherb" text upwards
    tl.to('.large-welherb', {
      y: '-80%', 
      duration: 4, // Longer duration for a slower, smoother movement
      ease: 'power2.inOut' // Smoother easing function
    });

    // Smooth reveal of the bottle image and text
    tl.fromTo('.bottle-image', 
      { y: '50%', opacity: 0.5 }, 
      { 
        y: '0%', 
        opacity: 1, 
        duration: 4, // Increased duration for smoothness
        ease: 'power3.out' // Smooth easing for the reveal
      }
    );

    // Smooth animation for the left text ("Path to")
    tl.fromTo('.left-text', 
      { x: '-100%', opacity: 0 }, 
      { 
        x: '0%', 
        opacity: 1, 
        duration: 4, // Smooth transition
        ease: 'power3.out' 
      }, 
      '-=1' // Overlap with previous animation for continuous flow
    );

    // Smooth animation for the right text ("Better living")
    tl.fromTo('.right-text', 
      { x: '100%', opacity: 0 }, 
      { 
        x: '0%', 
        opacity: 1, 
        duration: 4, 
        ease: 'power3.out' 
      }, 
      '-=1' // Overlap with previous animation for continuous flow
    );

    // Unlock scroll after the parallax finishes
    ScrollTrigger.create({
      trigger: '.parallax-container',
      start: 'top top',
      end: 'bottom bottom',
      onEnter: () => document.body.style.overflow = 'hidden', // Lock scroll when entering
      onLeave: () => document.body.style.overflow = 'auto', // Unlock scroll when leaving
    });
  }
}

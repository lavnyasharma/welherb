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
        scrub: 2, // Slower scrub for smoother effect (higher value = smoother)
        pin: true, // Pin the section until the parallax animation is complete
        anticipatePin: 3, // Even smoother pinning behavior
        onUpdate: (self) => {
          this.handleScrollEffect(self); // Add custom scroll handling logic
        }
      }
    });

    // Smooth parallax animation for "Welherb" text
    tl.fromTo('.large-welherb', 
      { opacity: 0.2 }, // Start with lower opacity for a smoother fade-in
      { 
        opacity: 1, 
        duration: 6, // Increased duration for even smoother effect
        ease: 'power4.inOut' // Smooth easing function
      }
    );

    // Smooth movement of large "Welherb" text upwards
    tl.to('.large-welherb', {
      y: '-80%', 
      duration: 8, // Longer duration for even slower, smoother movement
      ease: 'power4.inOut' // Smoother easing function
    });

    // Smooth reveal of the bottle image and position it between the "Well" and "Herb"
    tl.fromTo('.bottle-image', 
      { y: '50%', opacity: 0.5 }, 
      { 
        y: '0%', 
        opacity: 1, 
        duration: 6, // Increased duration for smoother reveal
        ease: 'power4.out' // Smooth easing for the reveal
      }
    );

    // Position the bottle between the "Well" and "Herb" text as it comes up
    tl.to('.bottle-image', {
      y: '10%', // Adjust to the desired position where the bottle should rest
      duration: 4, // Duration for the transition of the bottle's final position
      ease: 'power4.inOut' // Smooth easing for positioning
    });

    // Smooth animation for the left text ("Path to")
    tl.fromTo('.left-text', 
      { x: '-100%', opacity: 0 }, 
      { 
        x: '0%', 
        opacity: 1, 
        duration: 6, // Smooth transition
        ease: 'power4.out' 
      }, 
      '-=2' // Overlap with previous animation for continuous flow
    );

    // Smooth animation for the right text ("Better living")
    tl.fromTo('.right-text', 
      { x: '100%', opacity: 0 }, 
      { 
        x: '0%', 
        opacity: 1, 
        duration: 6, 
        ease: 'power4.out' 
      }, 
      '-=2' // Overlap with previous animation for continuous flow
    );

    // Scroll unlock after the parallax finishes
    ScrollTrigger.create({
      trigger: '.parallax-container',
      start: 'top top',
      end: 'bottom bottom',
      onEnter: () => document.body.style.overflow = 'hidden', // Lock scroll when entering
      onLeave: () => document.body.style.overflow = 'auto', // Unlock scroll when leaving
    });
  }

  // Handle the scroll effect to hide small Welherb and adjust the Path to Better Living text
  private handleScrollEffect(self: any): void {
    const smallWelherb = document.querySelector('.small-welherb') as HTMLElement;
    const pathText = document.querySelector('.path-to-better-living') as HTMLElement;
    
    if (self.progress > 0.1) {  // When scrolling past a certain point (adjust as necessary)
      // Hide the small Welherb and show the Path to Better Living
      smallWelherb.style.opacity = '0';
      pathText.style.opacity = '1';
    } else {
      // Otherwise, show the small Welherb and hide the Path to Better Living
      smallWelherb.style.opacity = '1';
      pathText.style.opacity = '0';
    }

    // Optionally, adjust positioning or other effects here
    const largeWelherb = document.querySelector('.large-welherb') as HTMLElement;
    largeWelherb.style.transform = `translateY(${self.progress * 50}%)`;  // Adjust parallax movement
  }
}

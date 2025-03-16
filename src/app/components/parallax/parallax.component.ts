import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.css']
})
export class ParallaxComponent implements OnInit, AfterViewInit {

  @ViewChild('parallaxContainer', { static: false }) parallaxContainer!: ElementRef;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.setupScrollAnimations();
  }

  setupScrollAnimations() {
    const container = this.parallaxContainer.nativeElement;
  
    // Set ScrollTrigger to track `.parallax-container` scrolling
    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value) {
        return arguments.length ? container.scrollTo(0, value) : container.scrollTop;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });
  
    // Enable GSAP Snap Scrolling
    ScrollTrigger.create({
      scroller: container,
      snap: 1 / 4, // Snap to the closest section
    });
  
    let lastDirection = 1; // 1 = down, -1 = up
  
    // ScrollTrigger to detect direction
    ScrollTrigger.create({
      scroller: container,
      onUpdate: (self) => {
        lastDirection = self.direction;
      }
    });
  
    // Common function to create animations
    function createParallaxAnimation(target:String,trigger:String, fromVars:Object, toVars:Object) {
      gsap.fromTo('.parallax-image', lastDirection === 1 ? fromVars : toVars, {
        ...lastDirection === 1 ? toVars : fromVars,
        scrollTrigger: {
          trigger: trigger,
          scroller: container,
          start: 'top 90%',
          end: 'top 50%',
          scrub: 1.5,
        }
      });
    }
  
    // Apply animations dynamically
    createParallaxAnimation(".parallax-image",'.sec', 
      { bottom: '-45%', scale: 1, transform: "rotate(0.1deg)", left: '40%', }, 
      { bottom: '-45%', scale: 1, transform: "rotate(0.1deg)", left: '40%' }
    );
  
    createParallaxAnimation(".parallax-image",'.sec1', 
      { bottom: '-45%', scale: 1, transform: "rotate(0deg)", left: '40%' }, 
      { bottom: '0%', scale: 1.2, transform: "rotate(10deg)", left: '20%' }
    );
  
    createParallaxAnimation(".parallax-image",'.sec2', 
      { bottom: '0%', scale: 1.2, transform: "rotate(10deg)", left: '20%' }, 
      { bottom: '0%', scale: 1, transform: "rotate(5deg)", left: '30%' }
    );
  
    createParallaxAnimation(".parallax-image",'.sec3', 
      { bottom: '0%', scale: 1, transform: "rotate(5deg)", left: '30%' }, 
      { bottom: '10%', scale: 1, transform: "rotate(0deg)", left: '40%' }
    );
  
    // Label Animations with Direction Swap
    function createLabelAnimation(trigger: String, fromX:Number, toX:Number) {
      gsap.fromTo('.labels', 
        { transform: `translateX(${lastDirection === 1 ? fromX : toX}px)` }, 
        { transform: `translateX(${lastDirection === 1 ? toX : fromX}px)`, scrollTrigger: {
            trigger: trigger,
            scroller: container,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1.5
        }}
      );
    }
  
    createLabelAnimation('.sec', 1, 0);
    createLabelAnimation('.sec1', 1, 0);
    createLabelAnimation('.sec2', -1, -278);
    createLabelAnimation('.sec3', -278, -556);
  
    // Refresh ScrollTrigger after DOM is ready
    ScrollTrigger.refresh();
  }
  
  
}

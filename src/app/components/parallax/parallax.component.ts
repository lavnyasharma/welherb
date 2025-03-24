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
    function createParallaxAnimation(target:string,trigger:string, fromVars:Object, toVars:Object) {
      gsap.fromTo(target, lastDirection === 1 ? fromVars : toVars, {
        ...lastDirection === 1 ? toVars : fromVars,
        
        scrollTrigger: {
          trigger: trigger,
          scroller: container,
          start: 'top 90%',
          end: 'top 50%',
          scrub: 3,
        }
      });
    }
  
    // Apply animations dynamically
    createParallaxAnimation(".parallax-image",'.sec', 
      { bottom: '-45%', scale: 1, transform: "rotate(0.1deg)", left: '40%',  ease: "cubic-bezier(1, 0.17, 0.31, 1)"}, 
      { bottom: '-45%', scale: 1, transform: "rotate(0.1deg)", left: '40%', ease: "cubic-bezier(1, 0.17, 0.31, 1)" }
    );
  
    createParallaxAnimation(".parallax-image",'.sec1', 
      { bottom: '-45%', scale: 1, transform: "rotate(0deg)", left: '40%', ease: "cubic-bezier(1, 0.17, 0.31, 1)" }, 
      { bottom: '0%', scale: 1.3, transform: "rotate(10deg)", left: '35%', ease: "cubic-bezier(1, 0.17, 0.31, 1)" }
    );
  
    createParallaxAnimation(".parallax-image",'.sec2', 
      { bottom: '0%', scale: 1.3, transform: "rotate(10deg)", left: '35%', ease: "cubic-bezier(1, 0.17, 0.31, 1)" }, 
      { bottom: '0%', scale: 1.2, transform: "rotate(5deg)", left: '40%' }
    );
  
    createParallaxAnimation(".parallax-image",'.sec3', 
      { bottom: '0%', scale: 1.2, transform: "rotate(5deg)", left: '40%', ease: "cubic-bezier(1, 0.17, 0.31, 1)" }, 
      { bottom: '15%', scale: 1, transform: "rotate(0deg)", left: '40%', ease: "cubic-bezier(1, 0.17, 0.31, 1)" }
    );
  // text animations
  function createParallaxAnimationText(target:string,trigger:string, fromVars:Object, toVars:Object,start:string,end:string,scrub:number=3) {
    gsap.fromTo(target, lastDirection === 1 ? fromVars : toVars, {
      ...lastDirection === 1 ? toVars : fromVars,
      
      scrollTrigger: {
        trigger: trigger,
        scroller: container,
        start: start,
        end: end,
        scrub: scrub,
      }
    });
  }

  createParallaxAnimationText(".title-section",'.sec1', 
    { bottom:"50%",scale: 1,   ease: "cubic-bezier(1, 0.17, 0.31, 1)",duration: 5 }, 
    { bottom:"-40%",left:"10%",scale: 0.8,  ease: "cubic-bezier(1, 0.17, 0.31, 1)",duration: 5 },
    "top 90%","top 50%" ,3
  );

  // arrow animation
  createParallaxAnimationText(".arrow1",'.sec1', 
    { bottom:"15%",scale: 1,   ease: "cubic-bezier(1, 0.17, 0.31, 1)",duration: 5 }, 
    { bottom:"-40%",left:"10%",scale: 0.8,  ease: "cubic-bezier(1, 0.17, 0.31, 1)",duration: 5 },
    "top 90%","top 50%" ,5
  );
  createParallaxAnimationText(".part1",'.sec1', 
    { bottom:"-100%",scale: 0.8,   ease: "cubic-bezier(1, 0.17, 0.31, 1)",duration: 5 }, 
    { top:"15%",left:"61%",scale: 1,  ease: "cubic-bezier(1, 0.17, 0.31, 1)",duration: 5 },
    "top 90%","top 50%" ,3
  );
  createParallaxAnimationText(".part2",'.sec2', 
    { bottom:"-100%",scale: 0.8,   ease: "cubic-bezier(1, 0.17, 0.31, 1)",duration: 5 }, 
    { top:"35%",left:"12%",scale: 1,  ease: "cubic-bezier(1, 0.17, 0.31, 1)",duration: 5 },
    "top 90%","top 50%" ,3
  );
  createParallaxAnimationText(".part3",'.sec3', 
    { bottom:"-100%",scale: 0.8,   ease: "cubic-bezier(1, 0.17, 0.31, 1)",duration: 5 }, 
    { bottom:"20%",left:"61%",scale: 1,  ease: "cubic-bezier(1, 0.17, 0.31, 1)",duration: 5 },
    "top 90%","top 50%" ,3
  );
  createParallaxAnimationText(".button-container-buy-now",'.sec3', 
    { bottom:"-100%",scale: 0.8,   ease: "cubic-bezier(1, 0.17, 0.31, 1)",duration: 5 }, 
    { top:"50%",left:"12%",scale: 1,  ease: "cubic-bezier(1, 0.17, 0.31, 1)",duration: 5 },
    "top 90%","top 50%" ,3
  );





    // Label Animations with Direction Swap
    function createLabelAnimation(trigger: string, fromX:Number, toX:Number) {
      gsap.fromTo('.labels', 
        { transform: `translateX(${lastDirection === 1 ? fromX : toX}px)`, ease: "cubic-bezier(1, 0.17, 0.31, 1)" }, 
        { transform: `translateX(${lastDirection === 1 ? toX : fromX}px)`, ease: "cubic-bezier(1, 0.17, 0.31, 1)", scrollTrigger: {
            trigger: trigger,
            scroller: container,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 3
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

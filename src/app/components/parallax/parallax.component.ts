import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  lastDirection = 1;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // Force ScrollTrigger update after view is ready
    setTimeout(() => {
      this.setupScrollAnimations();
      ScrollTrigger.refresh();
    }, 1000);
  }

  setupScrollAnimations() {
    const container = this.parallaxContainer.nativeElement;

  
    ScrollTrigger.create({
      onUpdate: (self) => {
        this.lastDirection = self.direction;
      }
    });

    const createParallaxAnimationDelayed = (
      target: string,
      trigger: string,
      fromVars: Object,
      toVars: Object,
      start= 'top 90%',
      end = 'top 50%',
    ) => {
      ScrollTrigger.create({
        trigger,
        start,
        onEnter: () => {
          gsap.fromTo(target,
            fromVars,
            {
              ...toVars,
              scrollTrigger: {
                trigger,
                start,
                end,
                scrub: true,
              }
            });
        },
        once: true // Ensures the animation is only created once
      });
    };

    const createParallaxAnimation = (
      target: string,
      trigger: string,
      fromVars: Object,
      toVars: Object
    ) => {
      gsap.fromTo(target,
        this.lastDirection === 1 ? fromVars : toVars,
        {
          ...(this.lastDirection === 1 ? toVars : fromVars),
          scrollTrigger: {
            trigger: trigger,
            start: 'top 90%',
            end: 'top 50%',
            scrub: true,
          }
        });
    };

    const createParallaxAnimationText = (
      target: string,
      trigger: string,
      fromVars: Object,
      toVars: Object,
      start: string,
      end: string,
      scrub: number = 1
    ) => {
      gsap.fromTo(target,
        this.lastDirection === 1 ? fromVars : toVars,
        {
          ...(this.lastDirection === 1 ? toVars : fromVars),
          scrollTrigger: {
            trigger,
            start,
            end,
            scrub,
          }
        });
    };

    const createLabelAnimation = (trigger: string, fromX: number, toX: number) => {
      gsap.fromTo('.labels',
        { x: this.lastDirection === 1 ? fromX : toX },
        {
          x: this.lastDirection === 1 ? toX : fromX,
          scrollTrigger: {
            trigger,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1
          }
        });
    };

    // Main image movement
   

    createParallaxAnimationDelayed(".parallax-image", '.sec1',
      { bottom: '-45%', scale: 1, left: '40%', transform: 'rotate(0deg)' },
      { bottom: '0%', scale: 1.3, left: '35%', transform: 'rotate(10deg)' });

    createParallaxAnimationDelayed(".parallax-image", '.sec2',
      { bottom: '0%', scale: 1.3, left: '35%', transform: 'rotate(10deg)' },
      { bottom: '0%', scale: 1.2, left: '40%', transform: 'rotate(5deg)' });

    createParallaxAnimationDelayed(".parallax-container", '.sec3',
      {  zIndex:"10", },
      { zIndex: '-1000', },'bottom 90%','bottom 50%');
      createParallaxAnimationDelayed(".parallax-image", '.sec3',
      { bottom: '0%', scale: 1.2, left: '40%', transform: 'rotate(5deg)' },
      { bottom: '15%', scale: 1, left: '40%', transform: 'rotate(0deg)' });

    // Text animations
    createParallaxAnimationText(".title-section", '.sec1',
      { bottom: "50%", scale: 1 },
      { bottom: "-1000%", left: "10%", scale: 0.8 },
      "top 90%", "top 50%");

    createParallaxAnimationText(".arrow1", '.sec1',
      { bottom: "15%", scale: 1 },
      { bottom: "-1000%", left: "10%", scale: 0.8 },
      "top 90%", "top 50%");

    createParallaxAnimationText(".part1", '.sec1',
      { bottom: "-1000%", scale: 0.8 },
      { top: "15%", left: "61%", scale: 1 },
      "top 90%", "top 50%");

    createParallaxAnimationText(".part2", '.sec2',
      { bottom: "-1000%", scale: 0.8 },
      { top: "35%", left: "12%", scale: 1 },
      "top 90%", "top 50%");

    createParallaxAnimationText(".part3", '.sec3',
      { bottom: "-1000%", scale: 0.8 },
      { bottom: "20%", left: "61%", scale: 1 },
      "top 90%", "top 50%");

    createParallaxAnimationText(".button-container-buy-now", '.sec3',
      { bottom: "-1000%", scale: 0.8,opacity: 0 },
      { top: "50%", left: "12%", scale: 1,opacity: 1 },
      "top 90%", "top 50%");
  

    // Label scroll movement
    createLabelAnimation('.sec', 1, 0);
    createLabelAnimation('.sec1', 1, 0);
    createLabelAnimation('.sec2', -1, -278);
    createLabelAnimation('.sec3', -278, -556);

    // Update ScrollTrigger once everything is rendered
    ScrollTrigger.refresh();
  }

  showNow() {
    this.router.navigate(['/shopall']);
  }

  learnMore() {
    this.router.navigate(['/discover']);
  }
}

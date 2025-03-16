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
  
    // 🔹 Enable GSAP Snap Scrolling
    ScrollTrigger.create({
      scroller: container, // Attach to .parallax-container
      snap: 1 / 4, // Snap to the closest section
    });
  
    // 🔹 Scale Down Image on Scroll from sec to sec1
    gsap.from('.parallax-image', {
      bottom: '-45%',
      duration: 5,
      scale: 1,
      transform: "rotate(0.1deg)",
      left: '50%',
      scrollTrigger: {
        trigger: '.sec',
        scroller: container,
        start: 'top 50%',
        end: 'top 50%',
        scrub: 1.5
      }
    });
    
    gsap.to('.parallax-image', {
      bottom: '0%',
      duration: 5,
      scale: 1.2,
      transform: "rotate(10deg)",
      left: '20%',
      scrollTrigger: {
        trigger: '.sec1',
        scroller: container,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 1.5
      }
    });
    gsap.from('.parallax-image', {
      bottom: '0%',
      duration: 5,
      scale: 1.2,
      ease: "power2.inOut",
      transform: "rotate(10deg)",
      left: '20%',
      scrollTrigger: {
        trigger: '.sec2',
        scroller: container,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 1.5
      }
    });
    gsap.to('.parallax-image', {
      bottom: '0%',
      duration: 5,
      scale: 1,
      transform: "rotate(5deg)",
      left: '40%',
      scrollTrigger: {
        trigger: '.sec2',
        scroller: container,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 1.5
      }
    });
    gsap.from('.parallax-image', {
      bottom: '0%',
      duration: 5,
      scale: 1,
      transform: "rotate(5deg)",
      left: '40%',
      scrollTrigger: {
        trigger: '.sec3',
        scroller: container,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 1.5
      }
    });
    gsap.to('.parallax-image', {
      bottom: '10%',
      duration: 5,
      scale: 1,
      transform: "rotate(0deg)",
      left: '50%',
      scrollTrigger: {
        trigger: '.sec3',
        scroller: container,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 1.5
      }
    });


    // for label
    gsap.from('.labels', {
      transform: "translateX(1px)",
      scrollTrigger: {
        trigger: '.sec',
        scroller: container,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 1.5
      }
    });
    gsap.from('.labels', {
      transform: "translateX(1px)",
      scrollTrigger: {
        trigger: '.sec1',
        scroller: container,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 1.5
      }
    });

    gsap.from('.labels', {
      transform: "translateX(1px)",
      scrollTrigger: {
        trigger: '.sec2',
        scroller: container,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 1.5
      }
    });
    gsap.to('.labels', {
      transform: "translateX(-278px)",
      scrollTrigger: {
        trigger: '.sec2',
        scroller: container,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 1.5
      }
    });
    gsap.from('.labels', {
      transform: "translateX(-278px)",
      scrollTrigger: {
        trigger: '.sec3',
        scroller: container,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 1.5
      }
    });
    gsap.to('.labels', {
      transform: "translateX(-556px)",
      scrollTrigger: {
        trigger: '.sec3',
        scroller: container,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 1.5
      }
    });
  
  
    // Refresh ScrollTrigger after DOM is ready
    ScrollTrigger.refresh();
  }
  
  
}

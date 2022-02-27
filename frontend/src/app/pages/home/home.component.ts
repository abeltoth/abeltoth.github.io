import { ISourceOptions } from 'tsparticles';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import particlesOptions from './particles-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  particlesOptions: ISourceOptions = particlesOptions;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const particlesContainer =
      this.elementRef.nativeElement.querySelector('#tsparticles');
    const homeContainer =
      this.elementRef.nativeElement.querySelector('#home-container');
    this.setParticlesContainer(particlesContainer);
    this.setHomeHeight(homeContainer);
    window.addEventListener(
      'resize',
      this.setHomeHeight.bind(null, homeContainer)
    );
  }

  scrollToWork() {
    const el = document.getElementById('work-container');
    el?.scrollIntoView({ behavior: 'smooth' });
  }

  setHomeHeight(homeContainer: HTMLElement) {
    if (homeContainer.scrollHeight > window.innerHeight) {
      homeContainer.style.height = 'auto';
    } else {
      homeContainer.style.height = '100vh';
    }
  }

  setParticlesContainer(particlesContainer: HTMLElement) {
    particlesContainer.style.height = '100vh';
    (particlesContainer.firstChild as HTMLElement).style.background =
      '-webkit-linear-gradient(#000000, #01001b)';
  }
}

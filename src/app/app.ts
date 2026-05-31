import { Component, AfterViewInit, NgZone } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { SocialNetworks } from './shared/social-networks/social-networks';
import { ScrollTop } from "./shared/scroll-top/scroll-top";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, SocialNetworks, ScrollTop],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  constructor(
    private router: Router,
    private zone: NgZone
  ) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => this.initBootstrap(), 300);
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => this.initBootstrap(), 300);
      });
    });
  }

  private initBootstrap() {
    const b = (window as any).bootstrap;
    if (b) {
      document.querySelectorAll('.dropdown-toggle').forEach(el => {
        if (!(el as any).__bsDropdown) {
          (el as any).__bsDropdown = new b.Dropdown(el);
        }
      });
      const carousels = document.querySelectorAll('.carousel');
      carousels.forEach(el => {
        if (!(el as any).__bsCarousel) {
          (el as any).__bsCarousel = new b.Carousel(el, { ride: 'carousel' });
        }
      });
    }
  }
}

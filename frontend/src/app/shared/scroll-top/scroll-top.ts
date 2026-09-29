import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  imports: [],
  templateUrl: './scroll-top.html',
  styleUrl: './scroll-top.css',
})
export class ScrollTop {

    showButton = false;
  bottomOffset = 20;

  ngOnInit() {
    this.checkScrollPosition();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScrollPosition();
  }

  checkScrollPosition() {
    this.showButton = window.scrollY > 300;
    const remaining = document.documentElement.scrollHeight - (window.innerHeight + window.scrollY);
    if (remaining < 120) {
      this.bottomOffset = 20 + (120 - remaining) * 0.5;
    } else {
      this.bottomOffset = 20;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

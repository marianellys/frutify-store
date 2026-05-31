import { Component, AfterViewInit } from '@angular/core';

declare var baguetteBox: any;

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery implements AfterViewInit {
  ngAfterViewInit() {
    if (typeof baguetteBox !== 'undefined') {
      baguetteBox.run('.tz-gallery', {
        animation: 'fadeIn',
        noScrollbars: true
      });
    }
  }
}

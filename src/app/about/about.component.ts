import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  imgArray : string[] = [
    'assets/pictures/Double_Soup_Pack.jpg',
    'assets/pictures/Honey_and_Soup.jpg',
    'assets/pictures/Bee_Bread.jpg',
    'assets/pictures/Harvesting.jpg',
    'assets/pictures/Honey.jpg',
    'assets/pictures/Honeycomb.jpg',
    'assets/pictures/soaps.jpg'
  ];

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
  }

  ngOnInit(): void {
  }
}

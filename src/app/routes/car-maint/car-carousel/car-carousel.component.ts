import { Component, OnInit, Input } from "@angular/core";
import { Car } from "src/app/services/car-interface";
import { ScreenService } from "src/spa/services/screen.service";

@Component({
  selector: "app-car-carousel",
  templateUrl: "./car-carousel.component.html",
  styleUrls: ["./car-carousel.component.css"]
})
export class CarCarouselComponent implements OnInit {
  slides = new Array<string>();

  constructor(public screenService: ScreenService) {}

  ngOnInit() {
    for (let i = 1; i <= 5; i++) {
      this.slides.push("assets/cars/carousel/slide" + i + ".jpg");
    }
  }
}

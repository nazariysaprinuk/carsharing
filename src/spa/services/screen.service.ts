import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ScreenService {
  private resizeSource = new Subject<null>();
  public resize$ = this.resizeSource.asObservable();

  largePixels = 850;
  screenWidth: number;
  screenHeight: number;

  constructor() {
    try {
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
      window.addEventListener("resize", event => this.onResize(event));
    } catch (e) {
      console.error(e);
    }
  }

  onResize(event: UIEvent): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.resizeSource.next()
  }

  isLarge(): boolean {
    return this.screenWidth >= this.largePixels;
  }

  isSmall(): boolean {
    return this.screenWidth < this.largePixels;
  }
}

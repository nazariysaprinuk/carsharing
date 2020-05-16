import { Injectable } from "@angular/core";
import { Lightbox } from "ngx-lightbox";

@Injectable({
  providedIn: "root"
})
export class LightboxService {
  private _album: Array<any> = [];
  constructor(private _lightbox: Lightbox) {}

  set album(imageArray: Array<any>) {
    if (imageArray != []) this._album = imageArray;
  }

  get album() {
    return this._album;
  }

  add(src, thumb, caption?) {
    if (!caption) caption = "Img" + this._album.length;
    this._album.push({ src: src, caption: caption, thumb: thumb });
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._album, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}

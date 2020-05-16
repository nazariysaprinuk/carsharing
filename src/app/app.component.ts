import { Component, OnInit } from "@angular/core";
import {
  SpaConfigService,
  SpaConfigSettings
} from "../spa/services/spa-config.service";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { of, from } from "rxjs";
import { map } from "rxjs/operators";
import { MenuService } from '../spa/services/menu.service';
import { AppMenuItems } from './app.menu'

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "carsharing";
  constructor(
    private spaConfigService: SpaConfigService,
    private menuService: MenuService,
  ) {
    this.spaConfigService.addSvgIcon("facebook");
    this.spaConfigService.addSvgIcon("instagram");
    this.spaConfigService.addSvgIcon("snapchat");
    this.spaConfigService.addSvgIcon("whatsapp");

    const config: SpaConfigSettings = {
      socialIcons: [
        { name: "facebook", alt: "Facebook", url: "https://facebook.com/" },
        { name: "instagram", alt: "Instagram", url: "https://www.instagram.com/" },
        { name: "snapchat", alt: "Snapchat", url: "https://www.snapchat.com/" },
        { name: "whatsapp", alt: "WhatsApp", url: "https://www.whatsapp.com/" }
      ],
      showUserControl: true
    };

    spaConfigService.configure(config);
    menuService.items = AppMenuItems;
  }

  
}

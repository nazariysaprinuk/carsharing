import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { MenuService } from "../services/menu.service";
import { ScreenService } from "../services/screen.service";
import { NavService } from "../services/nav.service";
import { UserApi } from '../users/users-api';

@Component({
  selector: "spa-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"]
})
export class ContentComponent implements AfterViewInit {
  @ViewChild("appDrawer", { static: false }) appDrawer: ElementRef;
  constructor(
    public menuService: MenuService,
    public screenService: ScreenService,
    public navService: NavService,
    public userApi: UserApi
  ) {}

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}

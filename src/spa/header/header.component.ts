import { Component, OnInit } from "@angular/core";
import { ScreenService } from "../services/screen.service";
import { MenuService } from "../services/menu.service";
import { NavService } from "../services/nav.service";

@Component({
  selector: "spa-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(
    private screenService: ScreenService,
    private menuService: MenuService,
    private navService: NavService
  ) {}

  ngOnInit() {}
}

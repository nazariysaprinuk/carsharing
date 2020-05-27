import { Component, OnInit } from "@angular/core";
import { ScreenService } from "../services/screen.service";
import { MenuService } from '../services/menu.service';

@Component({
  selector: "spa-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  title: string = "All rights reserved";
  year = new Date().getFullYear();
  constructor(
    public screenService: ScreenService,
    public menuService: MenuService
  ) {}

  ngOnInit() {}
}

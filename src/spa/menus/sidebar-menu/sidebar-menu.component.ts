import { Component, HostBinding, Input, OnInit } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { Router } from "@angular/router";
import { MenuItem, MenuService } from "src/spa/services/menu.service";
import { NavService } from "src/spa/services/nav.service";
import { ScreenService } from "src/spa/services/screen.service";

@Component({
  selector: "spa-sidebar-menu",
  templateUrl: "./sidebar-menu.component.html",
  styleUrls: ["./sidebar-menu.component.css"],
  animations: [
    trigger("indicatorRotate", [
      state("collapsed", style({ transform: "rotate(0deg)" })),
      state("expanded", style({ transform: "rotate(180deg)" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4,0.0,0.2,1)")
      )
    ])
  ]
})
export class SidebarMenuComponent implements OnInit {
  expanded: boolean;
  @HostBinding("attr.aria-expanded") ariaExpanded = this.expanded;
  @Input() item: MenuItem;
  @Input() depth: number;

  constructor(
    private navService: NavService,
    private screenService: ScreenService,
    private menuService: MenuService,
    public router: Router
  ) {
    if (this.depth === undefined) {
      this.depth = 1;
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }

  onItemSelected(item: MenuItem) {
    if (!item.submenu || !item.submenu.length) {
      if(item.route)
        this.router.navigate([item.route]);
      if (this.screenService.isSmall()) {
        // console.log(this.navService.appDrawer)
        // debugger;
        // Close Sidebar after select item
        this.navService.closeNav();
        // this.menuService.toggleMenu();

      }
    }
    if (item.submenu && item.submenu.length) {
      this.expanded = !this.expanded;
    }
  }
}

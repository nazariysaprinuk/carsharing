import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MenuService, MenuItem } from 'src/spa/services/menu.service';


@Component({
  selector: 'spa-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.css']
})
export class PopupMenuComponent implements OnInit {

  @Input() menu: Array<MenuItem>;
  @ViewChild('childMenu', {static: true}) public childMenu;
  constructor(private menuService: MenuService) { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NavService } from 'src/spa/services/nav.service';

@Component({
  selector: 'spa-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public menuService: MenuService, public navService: NavService) { }

  ngOnInit() {
  }

}

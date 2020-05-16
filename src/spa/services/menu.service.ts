import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface MenuItem {
   text: string,
   disabled?: boolean,
   icon?: string,
   route?: string,
   submenu?: Array<MenuItem>
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  items: Array<MenuItem>
  isVertical = false;
  showVerticalMenu = false;
  
  toggleMenu(): void {
    this.isVertical = true;
    this.showVerticalMenu = !this.showVerticalMenu;
  }

  toggleOrientation(): void {
    this.isVertical = !this.isVertical; 
  }
}

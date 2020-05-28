import { MenuItem } from "../spa/services/menu.service";

export const AppMenuItems: Array<MenuItem> = [
  {
    text: "Cars",
    icon: "directions_car",
    route: "/authenticated/cars",
    submenu: [
      {
        text: "Best one",
        icon: "directions_car",
        route: "/authenticated/car-list/1",
        submenu: null
      },
      {
        text: "Top 3",
        icon: "directions_car",
        route: "/authenticated/car-list/3",
        submenu: null
      },
      {
        text: "Top 5",
        icon: "directions_car",
        route: "/authenticated/car-list/5",
        submenu: null
      }
    ]
  },
  {
    text: "Maintenance",
    icon: "settings_applications",
    route: null,
    submenu: [
      {
        text: "Car maint",
        icon: "local_car_wash",
        route: "/authenticated/car-maint",
        submenu: null
      },
      {
        text: "Settings",
        icon: "settings",
        route: "/authenticated/settings",
        submenu: null
      }
    ]
  },
  {
    text: "Home",
    icon: "home",
    route: "/authenticated/home",
    submenu: null
  },
  {
    text: "Logs",
    icon: "logs",
    route: "/authenticated/logs",
    submenu: null
  }
];

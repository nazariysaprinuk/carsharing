import { MenuItem } from "../spa/services/menu.service";

export const AppMenuItems: Array<MenuItem> = [
  {
    text: "Cars",
    icon: "directions_car",
    route: "/authenticated/cars",
    submenu: [
      {
        text: "Select",
        icon: "mouse",
        route: "/authenticated/cars",
        submenu: [
          {
            text: "Ferrari",
            icon: "360",
            route: "/authenticated/car-detail/ferrari",
            submenu: null
          },
          {
            text: "Bugatti",
            icon: "360",
            route: "/authenticated/car-detail/bugatti",
            submenu: null
          },
          {
            text: "Lamburghini",
            icon: "360",
            route: "/authenticated/car-detail/lamburghini",
            submenu: null
          },
          {
            text: "Maseratti",
            icon: "360",
            route: "/authenticated/car-detail/maseratti",
            submenu: null
          }
        ]
      },
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
  }
];

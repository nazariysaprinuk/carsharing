import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { Car } from "./car-interface";
import { Observable, of, throwError } from "rxjs";
import { delay, catchError, map, take, tap } from "rxjs/operators";

@Injectable()
export class AppDataService {
  private CarsCollection: Array<Car> = [
    {
      id: 1,
      name: "Toyota",
      model: "Camry",
      date: 2010,
      type: "Saloon",
      numb_seats: 5,
      engine: {
        fuel_type: "Petrol",
        transmission: "Automatic",
        cubic_capacity: 3500
      },
      price: 11000,
      image: "assets/cars/camry2010.png",
      location: "Lviv, Ukraine",
      ext_color: "Silver",
      orders: 20
    },
    {
      id: 2,
      name: "Honda",
      model: "Accord",
      date: 2010,
      type: "Coupe",
      numb_seats: 4,
      engine: {
        fuel_type: "Petrol",
        transmission: "Automatic",
        cubic_capacity: 2400
      },
      price: 10400,
      image: "assets/cars/accord-coupe2010.png",
      location: "Lviv, Ukraine",
      ext_color: "Silver",
      orders: 9
    },
    {
      id: 3,
      name: "Audi",
      model: "A6",
      date: 2010,
      type: "EstateCar",
      numb_seats: 5,
      engine: {
        fuel_type: "Diesel",
        transmission: "Automatic",
        cubic_capacity: 3000
        // Turbo
      },
      price: 12600,
      image: "assets/cars/AudiA62010.png",
      location: "Lviv, Ukraine",
      ext_color: "Silver",
      orders: 11
    },
    {
      id: 4,
      name: "BMW",
      model: "535i",
      date: 2010,
      type: "Saloon",
      numb_seats: 5,
      engine: {
        fuel_type: "Petrol",
        transmission: "Automatic",
        cubic_capacity: 3000
        // Turbo
      },
      price: 12600,
      image: "assets/cars/bmw535i2010.png",
      location: "Lviv, Ukraine",
      ext_color: "Silver",
      orders: 13
    },
    {
      id: 5,
      name: "Mercedes-Benz",
      model: "E-320",
      date: 2010,
      type: "Saloon",
      numb_seats: 5,
      engine: {
        fuel_type: "Diesel",
        transmission: "Automatic",
        cubic_capacity: 3200
      },
      price: 14000,
      image: "assets/cars/mercw2112009.png",
      location: "Lviv, Ukraine",
      ext_color: "silver",
      orders: 10
    },
    {
      id: 6,
      name: "Volkswagen",
      model: "Touareg",
      date: 2013,
      type: "SUV",
      numb_seats: 5,
      engine: {
        fuel_type: "Petrol",
        transmission: "Automatic",
        cubic_capacity: 3000
      },
      price: 22900,
      image: "assets/cars/touareg2013.png",
      location: "Lviv, Ukraine",
      ext_color: "Silver",
      orders: 6
    },
    {
      id: 7,
      name: "Tesla",
      model: "Model S",
      date: 2015,
      type: "Saloon",
      numb_seats: 5,
      engine: {
        fuel_type: "Electric",
        transmission: "Automatic",
        cubic_capacity: 100
        // Turbo
      },
      price: 25000,
      image: "assets/cars/tesla2015.png",
      location: "Lviv, Ukraine",
      ext_color: "Silver",
      orders: 18
    },
    {
      id: 8,
      name: "Infinity",
      model: "G37",
      date: 2010,
      type: "Coupe",
      numb_seats: 4,
      engine: {
        fuel_type: "Petrol",
        transmission: "Automatic",
        cubic_capacity: 3700
        // Turbo
      },
      price: 14500,
      image: "assets/cars/infinitig37.png",
      location: "Lviv, Ukraine",
      ext_color: "Silver",
      orders: 4
    },
    {
      id: 9,
      name: "Hyundai",
      model: "Grandeur",
      date: 2009,
      type: "Saloon",
      numb_seats: 5,
      engine: {
        fuel_type: "Petrol",
        transmission: "Automatic",
        cubic_capacity: 3300
        // Turbo
      },
      price: 7500,
      image: "assets/cars/grandeur2009.png",
      location: "Lviv, Ukraine",
      ext_color: "Silver",
      orders: 6
    },
    {
      id: 10,
      name: "Nissan",
      model: "GT-R",
      date: 2009,
      type: "Sports Car",
      numb_seats: 5,
      engine: {
        fuel_type: "Petrol",
        transmission: "Automatic",
        cubic_capacity: 3800
        // Turbo
      },
      price: 75000,
      image: "assets/cars/gt-r35.png",
      location: "Kyiv, Ukraine",
      ext_color: "White Mettalic",
      orders: 1
    },
    {
      id: 11,
      name: "Nissan",
      model: "370z",
      date: 2013,
      type: "Coupe",
      numb_seats: 5,
      engine: {
        fuel_type: "Petrol",
        transmission: "Automatic",
        cubic_capacity: 3700
        // Turbo
      },
      price: 22000,
      image: "assets/cars/370z.png",
      location: "Kyiv, Ukraine",
      ext_color: "White Mettalic",
      orders: 2
    },
    {
      id: 12,
      name: "Nissan",
      model: "Leaf",
      date: 2013,
      type: "Saloon",
      numb_seats: 5,
      engine: {
        fuel_type: "Electric",
        transmission: "Automatic",
        cubic_capacity: 30
        // Turbo
      },
      price: 11200,
      image: "assets/cars/leaf.png",
      location: "Lviv, Ukraine",
      ext_color: "White Mettalic",
      orders: 15
    },
    {
      id: 13,
      name: "Volkswagen",
      model: "Passat B8",
      date: 2018,
      type: "Saloon",
      numb_seats: 5,
      engine: {
        fuel_type: "Patrol",
        transmission: "Automatic",
        cubic_capacity: 2000
        // Turbo
      },
      price: 19500,
      image: "assets/cars/passatb8.png",
      location: "Lviv, Ukraine",
      ext_color: "Milano Red",
      orders: 9
    },
    {
      id: 14,
      name: "Volkswagen",
      model: "Golf 4",
      date: 2001,
      type: "EstateCar",
      numb_seats: 5,
      engine: {
        fuel_type: "Diesel",
        transmission: "Manual",
        cubic_capacity: 1900
        // Turbo
      },
      price: 4500,
      image: "assets/cars/golf-IV.png",
      location: "Lviv, Ukraine",
      ext_color: "Red",
      orders: 16
    },
    {
      id: 15,
      name: "Audi",
      model: "A4",
      date: 2010,
      type: "Saloon",
      numb_seats: 5,
      engine: {
        fuel_type: "Patrol",
        transmission: "Automatic",
        cubic_capacity: 1800
        // Turbo
      },
      price: 10600,
      image: "assets/cars/Audi-A42010.png",
      location: "Lviv, Ukraine",
      ext_color: "Silver",
      orders: 6
    },
    {
      id: 16,
      name: "Renault",
      model: "Trafic",
      date: 2010,
      type: "Van / Minibus",
      numb_seats: 9,
      engine: {
        fuel_type: "Diesel",
        transmission: "Manual",
        cubic_capacity: 2500
        // Turbo
      },
      price: 9800,
      image: "assets/cars/trafic.png",
      location: "Lviv, Ukraine",
      ext_color: "Silver",
      orders: 5
    }
  ];

  constructor(private userService: UserService) {}
  getCars(): Observable<Car[]> {
    return of(this.CarsCollection);
  }
  getCar(id: number): Observable<Car> {
    const car = this.CarsCollection.find(item => item.id === id);
    return of(car);
  }
  deleteCar(id: number): Observable<Car[]> {
    return of({}).pipe(
      delay(2000),
      map(() => {
        return this.CarsCollection.splice(
          this.CarsCollection.findIndex(item => item.id === id),
          1
        );
      })
    );
  }
  createCar(newCar: Car): Observable<any> {
    let id = 0;
    this.CarsCollection.forEach(item => {
      if (item.id >= id) {
        id = item.id + 1;
      }
    });
    newCar.id = id;
    this.CarsCollection.push(newCar);
    return of(newCar);
  }
  updateCar(CarForUpdating: Car): Observable<any> {
    const car = this.CarsCollection.find(item => item.id === CarForUpdating.id);
    Object.assign(car, CarForUpdating);
    return of(car).pipe(delay(1200));
  }
}

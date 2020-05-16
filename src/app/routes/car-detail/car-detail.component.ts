import { Component, OnInit } from "@angular/core";
import { FieldInput } from "../../../spa/dynamicForms/field-interface";
import { Car } from "../../services/car-interface";
import { AppDataService } from "../../services/app-data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { from } from "rxjs";
@Component({
  selector: "app-car-detail",
  templateUrl: "./car-detail.component.html",
  styleUrls: ["./car-detail.component.css"]
})
export class CarDetailComponent implements OnInit {
  car: Car;
  carDefinitionInput: Array<FieldInput> = [
    { key: "id", type: "number", isId: true, label: "Id", required: true },
    {
      key: "name",
      type: "string",
      isId: false,
      label: "Car name",
      required: true
    },
    {
      key: "model",
      type: "string",
      isId: false,
      label: "Car model",
      required: true
    },
    {
      key: "price",
      type: "amount",
      isId: false,
      label: "Car price value",
      required: true
    },
    {
      key: "date",
      type: "number",
      isId: false,
      label: "First registration",
      required: true
    },
    {
      key: "type",
      type: "string",
      isId: false,
      label: "Car type",
      required: true
    },
    {
      key: "numb_seats",
      type: "number",
      isId: false,
      label: "Number of seats",
      required: true
    },
    {
      key: "engine",
      type: "object",
      isId: false,
      label: "Engine",
      required: true,
      child: [
        {
          key: "fuel_type",
          type: "string",
          isId: false,
          label: "Fuel type",
          required: true
        },
        {
          key: "transmission",
          type: "string",
          isId: false,
          label: "Transmission",
          required: true
        },
        {
          key: "cubic_capacity",
          type: "string",
          isId: false,
          label: "Cubic capacity",
          required: true
        }
      ]
    },

    {
      key: "image",
      type: "image",
      isId: false,
      label: "Image",
      required: true
    },
    {
      key: "location",
      type: "string",
      isId: false,
      label: "Location",
      required: true
    },
    {
      key: "ext_color",
      type: "string",
      isId: false,
      label: "Exterior color",
      required: true
    }
  ];
  operation: string; // edit/ read/ create/
  errorMessage: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appDataService: AppDataService
  ) {}

  ngOnInit() {
    this.operation = this.route.snapshot.params["operation"];
    if (this.operation === "create") {
      this.car = {
        id: 0,
        name: "",
        model: "",
        date: null,
        type: "",
        numb_seats: null,
        engine: { fuel_type: "", transmission: "", cubic_capacity: null },
        price: null,
        image: "",
        location: "",
        ext_color: "",
        orders: null
      };
    } else {
      this.appDataService
        .getCar(+this.route.snapshot.params["id"])
        .subscribe((car: Car) => (this.car = car));
    }
  }

  createCar(car: Car) {
    car.id = 0;
    this.errorMessage = null;
    this.appDataService.createCar(car).subscribe(
      c => this.router.navigate(["/authenticated/car-maint"]),
      error => (this.errorMessage = "Error creating car")
    );
  }
  updateCar(car: Car) {
    this.errorMessage = null;
    this.appDataService.updateCar(car).subscribe(
      c => this.router.navigate(["/authenticated/car-maint"]),
      error => (this.errorMessage = "Error updating car")
    );
  }
}

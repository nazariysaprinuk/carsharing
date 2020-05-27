import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { Car } from "src/app/services/car-interface";
import { ChartService } from "src/app/services/chart.service";
import { ScreenService } from "src/spa/services/screen.service";
import { BaseChartDirective } from "ng2-charts";
import { AppDataService } from "src/app/services/app-data.service";
@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"]
})
export class BarChartComponent implements OnInit, OnChanges {
  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;

  public carList: Array<Car>;
  public barChartLabels = new Array<string>();
  public barChartType = "bar";
  public barChartLegend = true;
  public barChartData = [
    {
      data: [],
      label: "",
      backgroundColor: []
    }
  ];

  constructor(
    private chartService: ChartService,
    private appDataService: AppDataService
  ) {
      appDataService.getCars().subscribe(data => {
        this.carList = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            model: e.payload.doc.data()['model'],
            date: e.payload.doc.data()['date'],
            type: e.payload.doc.data()['type'],
            numb_seats: e.payload.doc.data()['numb_seats'],
            engine: e.payload.doc.data()['engine'],
            price: e.payload.doc.data()['price'],
            image: e.payload.doc.data()['image'],
            location: e.payload.doc.data()['location'],
            ext_color: e.payload.doc.data()['ext_color'],
            orders: e.payload.doc.data()['orders'],
          }
        })
        this._data();
    });
  }

  ngOnInit() {
    
  }

  _data() {
    if (this.carList.length > 0) {
      this.carList.forEach(car => {
        this.barChartLabels.push(car.name + " " + car.model);
        this.barChartData[0].data.push(car.orders);
        this.barChartData[0].label = "Number of orders during the year";
        this.barChartData[0].backgroundColor.push(
          this.chartService.getRandomColor()
        );
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  updateChart() {
    console.log(this.chart);
    this.chart.chart.update(); // This re-renders the canvas element.
  }
}

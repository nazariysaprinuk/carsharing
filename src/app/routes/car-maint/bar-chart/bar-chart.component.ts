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
    appDataService.getCars().subscribe(data => (this.carList = data));
  }

  ngOnInit() {
    this._data();
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

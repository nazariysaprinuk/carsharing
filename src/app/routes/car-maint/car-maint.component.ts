import { Component, OnInit, ViewChild, OnChanges, SimpleChanges } from "@angular/core";
import { Car } from "../../services/car-interface";
import { Router } from "@angular/router";
import { AppDataService } from "src/app/services/app-data.service";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { MenuService } from "src/spa/services/menu.service";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { SpaConfigService } from "src/spa/services/spa-config.service";
import { ScreenService } from "src/spa/services/screen.service";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-car-maint",
  templateUrl: "./car-maint.component.html",
  styleUrls: ["./car-maint.component.css"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class CarMaintComponent implements OnInit {
  
  carList: Array<Car>;
  deleteError: string;
  deleteId: number;
  isDeleting = false;
  expandedElement: Car | null;
  selection = new SelectionModel<Car>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ["select", "id", "name", "model", "price"];
  icons: string[] = [
    "battery",
    "car",
    "car-oil",
    "car-engine",
    "sports-car",
    "shifter",
    "calendar",
    "car-seat",
    "jeep",
    "painted-car",
    "price",
    "location",
    "van"
  ];

  dataSource: MatTableDataSource<Car>;

  constructor(
    private router: Router,
    private appDataService: AppDataService,
    private menuService: MenuService,
    private spaConfigService: SpaConfigService,
    private screenService: ScreenService
  ) {
    appDataService.getCars().subscribe(data => {
      this.carList = data;
      this.dataSource = new MatTableDataSource(this.carList);
    });

    this.icons.forEach(icon => this.spaConfigService.addSvgIcon(icon));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Car): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.id + 1}`;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createCar() {
    this.router.navigate(["/authenticated/car-detail", 0, "create"]);
  }
  showCarDetail(id: number) {
    this.router.navigate(["/authenticated/car-detail", id, "details"]);
  }
  editCar(id: number) {
    this.router.navigate(["/authenticated/car-detail", id, "edit"]);
  }
  deleteCarQuestion(id: number) {
    this.deleteError = null;
    this.deleteId = id;
  }
  cancelDelete() {
    this.isDeleting = false;
    this.deleteId = null;
  }
  deleteCar(id: number) {
    this.isDeleting = true;
    this.appDataService.deleteCar(id).subscribe(
      car => {
        this.cancelDelete();
        this.dataSource._updateChangeSubscription();
        this.carList = this.dataSource.data;
      },
      error => {
        this.deleteError = error;
        this.isDeleting = false;
      }
    );
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Car } from 'src/app/services/car-interface';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';
import { MenuService } from 'src/spa/services/menu.service';
import { SpaConfigService } from 'src/spa/services/spa-config.service';
import { ScreenService } from 'src/spa/services/screen.service';
import { LogService } from 'src/app/services/log.service';
import { UserService } from 'src/app/services/user.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { DocumentSnapshot } from '@angular/fire/firestore/interfaces';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  carList: Array<any>;
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
    public router: Router,
    public route: ActivatedRoute,
    public appDataService: AppDataService,
    public menuService: MenuService,
    public spaConfigService: SpaConfigService,
    public screenService: ScreenService,
    public logService: LogService,
    public userService: UserService
  ) {
      this.setCarList()
      // this.carList = data;
    
  }

  setCarList() {
    this.appDataService.getCars().subscribe(data => {
      if (data) {
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
        // 
        this.carList = this.carList.filter(c => c.orders).sort((car1, car2) => car2.orders - car1.orders ).slice(0, this.route.snapshot.params["count"])
        this.dataSource = new MatTableDataSource(this.carList);
        this.icons.forEach(icon => this.spaConfigService.addSvgIcon(icon));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  isAllSelected() {
    if (this.selection.selected && this.dataSource && this.dataSource.hasOwnProperty('data')) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    } else {
      return false
    }
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
    return `${ this.selection.isSelected(row) ? "deselect" : "select" } row '${row.id + 1}'`;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {});
    this.route.params.subscribe(routeParams => {
      this.setCarList()
    });
  }

  createCar() {
    this.router.navigate(["/authenticated/car-detail", "create"]);
  }
  showCarDetail(id: number) {
    this.router.navigate(["/authenticated/car-detail", id, "details"]);
  }
  editCar(id: number) {
    this.router.navigate(["/authenticated/car-detail", id, "edit"]);
  }
  deleteCarQuestion(id) {
    this.deleteError = null;
    this.deleteId = id;
  }
  cancelDelete() {
    this.isDeleting = false;
    this.deleteId = null;
  }
  deleteCar(id) {
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

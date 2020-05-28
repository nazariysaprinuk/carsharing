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
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, Action, DocumentSnapshot } from '@angular/fire/firestore'
import { LogService } from 'src/app/services/log.service';
import { Order } from 'src/app/services/order-interface';
import { UserService } from 'src/app/services/user.service';

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
    public appDataService: AppDataService,
    public menuService: MenuService,
    public spaConfigService: SpaConfigService,
    public screenService: ScreenService,
    public logService: LogService,
    public userService: UserService
  ) {
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
        this.dataSource = new MatTableDataSource(this.carList);
        this.icons.forEach(icon => this.spaConfigService.addSvgIcon(icon));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
      // this.carList = data;
    
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
  selectCar(id) {
    const start_date = new Date()
    const end_date = new Date(new Date().getTime()+(7*24*60*60*1000))
    const subscription = this.appDataService.getCar(id)
      .subscribe((car: Action<DocumentSnapshot<Car>>) => {
        this.userService.getCurrentUser()
        .subscribe((data) => {
          const ordersSubscription = this.logService.getOrders().subscribe((orders) => {
            const findOrdder = orders.find(order => order.payload.doc.data()['car_name'] === `${car.payload.data()['name']} ${car.payload.data()['model']}`) 
            this.logService.createOrder({
              id: '',
              car_name: `${car.payload.data()['name']} ${car.payload.data()['model']}`,
              tenet_name: data.payload.data()['name'],
              status: findOrdder && new Date(findOrdder.payload.doc.data()['end_date']).getTime() < start_date.getTime() ? 'Cancel' : 'Active',
              price_per_day: car.payload.data()['price'] ? +car.payload.data()['price'] : 50,
              start_date: `${String(start_date.getDate()).padStart(2, '0')}/${String(start_date.getMonth() + 1).padStart(2, '0')}/${start_date.getFullYear()} ${start_date.getUTCHours()}:${start_date.getMinutes()}`,
              end_date: `${String(end_date.getDate()).padStart(2, '0')}/${String(end_date.getMonth() + 1).padStart(2, '0')}/${end_date.getFullYear()} ${start_date.getUTCHours()}:${start_date.getMinutes()}`,
            })
            this.appDataService.updateCar({ ...car.payload.data(), orders: +car.payload.data()['orders'] ? +car.payload.data()['orders'] + 1  : 0 + 1, id: car.payload.id})
            ordersSubscription.unsubscribe()
            subscription.unsubscribe()
            this.router.navigate(["/authenticated/logs"]);  
          }) 
        }
      )
      
    })
  }
}

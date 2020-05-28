import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSortable } from '@angular/material';
import { Router } from '@angular/router';
import { LogService } from '../../services/log.service';
import { MenuService } from 'src/spa/services/menu.service';
import { SpaConfigService } from 'src/spa/services/spa-config.service';
import { ScreenService } from 'src/spa/services/screen.service';
import { Order } from 'src/app/services/order-interface';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  orderList: Array<any>
  displayedColumns: string[] = ["id", "car_name", "tenet_name", "price_per_day", "start_date", "end_date", "status"];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public router: Router,
    public logService: LogService,
    public menuService: MenuService,
    public spaConfigService: SpaConfigService,
    public screenService: ScreenService
  ) {
    this.logService.getOrders().subscribe(data => {
      if (data) {
        this.orderList = data.map(e => {
          return {
            id: e.payload.doc.id,
            car_name: e.payload.doc.data()['car_name'],
            start_date: e.payload.doc.data()['start_date'],
            end_date: e.payload.doc.data()['end_date'],
            price_per_day: e.payload.doc.data()['price_per_day'],
            status: e.payload.doc.data()['status'],
            tenet_name: e.payload.doc.data()['tenet_name']
          }
        })
        // 
        this.dataSource = new MatTableDataSource(this.orderList);
        // sort by default column - start_date
        this.sort.sort(({ id: 'start_date', start: 'desc'}) as MatSortable);
        this.dataSource.sort = this.sort;
      }
    })
   }

  ngOnInit() {
  }

}

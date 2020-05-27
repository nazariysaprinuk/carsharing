import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserService } from "./services/user.service";
import { HomeComponent } from "./routes/home/home.component";
import { SettingsComponent } from "./routes/settings/settings.component";
import { CarDetailComponent } from "./routes/car-detail/car-detail.component";
import { CarMaintComponent } from "./routes/car-maint/car-maint.component";
import { CarListComponent } from "./routes/car-list/car-list.component";
import { AuthenticatedComponent } from "./routes/authenticated/authenticated.component";
import { LogsComponent } from "./routes/logs/logs.component"
import { ChartsModule } from 'ng2-charts';

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SpaModule } from "../spa/spa.module";
import { UserApi } from "src/spa/users/users-api";
import { AuthGuard } from "./services/auth-guard.service";
import { AppMenuItems } from './app.menu';
import { LogService } from './services/log.service'
import { AppDataService } from './services/app-data.service';
import { CdkTableModule } from '@angular/cdk/table';
import { AngularMaterialModule } from './angular-material.module';
import { CarCarouselComponent } from './routes/car-maint/car-carousel/car-carousel.component';
import { ChartService } from './services/chart.service';
import { BarChartComponent } from './routes/car-maint/bar-chart/bar-chart.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    CarDetailComponent,
    CarMaintComponent,
    CarCarouselComponent,
    BarChartComponent,
    CarListComponent,
    LogsComponent,
    AuthenticatedComponent,
  ],
  imports: [
    BrowserModule,
    SpaModule,
    AppRoutingModule, 
    CdkTableModule, 
    AngularMaterialModule, 
    ChartsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    UserService,
    {
      provide: UserApi,
      useExisting: UserService
    },
    AuthGuard,
    AppDataService,
    LogService,
    ChartService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

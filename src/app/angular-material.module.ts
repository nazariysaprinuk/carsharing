import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatCheckboxModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTooltipModule,
  MatTableModule,
  MatTabsModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule
} from "@angular/material";
import { MatCarouselModule } from "@ngmodule/material-carousel";
import {
  MaterialFileInputModule,
  NGX_MAT_FILE_INPUT_CONFIG
} from "ngx-material-file-input";
import { MatFileUploadModule } from "angular-material-fileupload";

import { config } from "process";
@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatCarouselModule,
    MaterialFileInputModule,
    MatFileUploadModule
  ],
  exports: [
    MatCheckboxModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatCarouselModule,
    MaterialFileInputModule,
    MatFileUploadModule
  ],
  providers: [
    MatDatepickerModule,
    { provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config }
  ]
})
export class AngularMaterialModule {}

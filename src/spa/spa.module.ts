import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { ContentComponent } from "./content/content.component";
import { FooterComponent } from "./footer/footer.component";
import { SpaConfigService } from "./services/spa-config.service";
import { IconBarComponent } from "./icon-bar/icon-bar.component";
import { ScreenService } from "./services/screen.service";
import { ScreenSmallDirective } from "./directives/screen-small.directive";
import { ScreenLargeDirective } from "./directives/screen-large.directive";
import { MenuService } from "./services/menu.service";
import { MenuComponent } from "./menus/menu/menu.component";
import { PopupMenuComponent } from "./menus/popup-menu/popup-menu.component";
import { SignInComponent } from "./users/sign-in/sign-in.component";
import { RegistrationComponent } from "./users/registration/registration.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavService } from "./services/nav.service";
import { AlertService } from "./services/alert.service";
import { PasswordResetComponent } from "./users/password-reset/password-reset.component";

import { AngularMaterialModule } from "../app/angular-material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule } from "src/app/app-routing.module";
import { BodyComponent } from "./body/body.component";
import { SidebarMenuComponent } from "./menus/sidebar-menu/sidebar-menu.component";
import { DynamicFieldComponent } from "./dynamicForms/dynamic-field/dynamic-field.component";
import { DynamicFormComponent } from "./dynamicForms/dynamic-form/dynamic-form.component";
import { NavProfileComponent } from "./header/nav-profile/nav-profile.component";
// for HttpClient import:
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";

// for Router import:
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";

// for Core import:
import { LoadingBarModule } from "@ngx-loading-bar/core";
import { BackToTopComponent } from './body/back-to-top/back-to-top.component';
import { LightboxModule } from 'ngx-lightbox';
import { LightboxService } from './services/lightbox.service';
import { RatingModule } from 'ng-starrating';

@NgModule({
  declarations: [
    BodyComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    IconBarComponent,
    MenuComponent,
    PopupMenuComponent,
    SignInComponent,
    RegistrationComponent,
    PasswordResetComponent,
    SidebarMenuComponent,
    ScreenSmallDirective,
    ScreenLargeDirective,
    DynamicFieldComponent,
    DynamicFormComponent,
    NavProfileComponent,
    BackToTopComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    LightboxModule,
    RatingModule
  ],
  exports: [
    BodyComponent,
    FooterComponent,
    DynamicFormComponent,
    FlexLayoutModule,
    ScreenSmallDirective,
    ScreenLargeDirective,
    LightboxModule
  ],
  providers: [
    SpaConfigService,
    ScreenService,
    MenuService,
    NavService,
    AlertService,
    LightboxService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpaModule {}

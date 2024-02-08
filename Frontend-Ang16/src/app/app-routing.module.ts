import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsModule } from "ngx-bootstrap/tabs";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PropertyListComponent } from "./property/property-list/property-list.component";
import { AddPropertyComponent } from "./property/add-property/add-property.component";
import { PropertyDetailComponent } from "./property/property-detail/property-detail.component";
import { PropertyDetailResolverService } from "./property/property-detail/property-detail-resolver.service";
import { UserLoginComponent } from "./user/user-login/user-login.component";
import { UserRegisterComponent } from "./user/user-register/user-register.component";
import { CarouselModule } from 'ngx-bootstrap/carousel';

const appRoutes: Routes = [
  {path: '', component: PropertyListComponent},
  {path: 'rent-property', component: PropertyListComponent},
  {path: 'add-property', component: AddPropertyComponent},
  {path: 'property-detail/:id',
      component: PropertyDetailComponent,
      resolve: {prp: PropertyDetailResolverService}},
  {path: 'user/login', component: UserLoginComponent},
  {path: 'user/register', component: UserRegisterComponent},
  {path: '**', component: PropertyListComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot()
  ],
  exports: [
    RouterModule,
    BsDropdownModule,
    TabsModule,
    ButtonsModule,
    BsDatepickerModule,
    CarouselModule

  ]
})
export class AppRoutingModule { }

// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms'


// Componentes
import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,



  ],
  exports: [ 
    DashboardComponent,
    PagesComponent,

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  
  ]
})
export class PagesModule { }

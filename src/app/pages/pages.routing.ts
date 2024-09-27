import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PanelComponent } from "./panel/panel.component";


const routes: Routes = [
    {path: 'dashboard',
    component: PagesComponent,
     children: [
       {path: '', component: DashboardComponent},
       {path: 'panel', component: PanelComponent},
     ]
   },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

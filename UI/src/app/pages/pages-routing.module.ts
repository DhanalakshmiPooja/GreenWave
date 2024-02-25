import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'getStarted',
    pathMatch: 'full',
  },
  { path: 'getStarted', component: DashboardComponent },
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then((m) => m.TasksModule),
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

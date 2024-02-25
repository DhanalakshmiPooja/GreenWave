import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskConfigComponent } from './task-config/task-config.component';
import { TaskComponent } from './task.component';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
    children: [{ path: 'config', component: TaskConfigComponent }],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}

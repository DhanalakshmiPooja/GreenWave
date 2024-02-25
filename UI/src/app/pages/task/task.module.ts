import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TaskRoutingModule } from './task-routing.module';
import { TaskConfigComponent } from './task-config/task-config.component';
import { TaskComponent } from './task.component';

@NgModule({
  declarations: [TaskConfigComponent, TaskComponent],
  imports: [
    TaskRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TasksModule {}

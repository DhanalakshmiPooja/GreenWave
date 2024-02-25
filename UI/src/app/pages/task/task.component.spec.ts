import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { TaskConfigComponent } from './task-config/task-config.component';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskComponent, TaskConfigComponent],
      imports: [HttpClientModule, ToastrModule.forRoot()],
      providers: [DatePipe, ToastrService],
    });
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render a div with class "pages" containing the app-task-config component', () => {
    fixture.detectChanges();

    const pagesDiv: HTMLDivElement =
      fixture.nativeElement.querySelector('.pages');

    expect(pagesDiv).toBeTruthy();
    const TaskConfigComponent: HTMLElement | null =
      pagesDiv.querySelector('app-task-config');
    expect(TaskConfigComponent).toBeTruthy();
  });
});

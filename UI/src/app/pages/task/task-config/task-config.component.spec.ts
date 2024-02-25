import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskConfigComponent } from './task-config.component';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
describe('TaskConfigComponent', () => {
  let component: TaskConfigComponent;
  let fixture: ComponentFixture<TaskConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskConfigComponent],
      imports: [HttpClientModule, ToastrModule.forRoot()],
      providers: [DatePipe, ToastrService],
    });
    fixture = TestBed.createComponent(TaskConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the header with the correct content', () => {
    fixture.detectChanges();
    const h4Element: HTMLHeadingElement =
      fixture.nativeElement.querySelector('h4');

    expect(h4Element).toBeTruthy();
    expect(h4Element.textContent).toContain('Task');
  });
  it('should render the span with the correct buttons and icons', () => {
    fixture.detectChanges();

    const spanElement: HTMLSpanElement =
      fixture.nativeElement.querySelector('.span1');
    expect(spanElement).toBeTruthy();

    const addButton: HTMLButtonElement | null =
      spanElement.querySelector('.btn-primary');

    expect(addButton).toBeTruthy();

    spyOn(component, 'openModal');
    addButton?.click();
    expect(component.openModal).toHaveBeenCalled();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header with the correct content', () => {
    fixture.detectChanges();

    const h1Element: HTMLHeadingElement =
      fixture.nativeElement.querySelector('h1');

    expect(h1Element).toBeTruthy();

    expect(h1Element.textContent).toContain('Welcome to');

    const imgElement: HTMLImageElement | null = h1Element.querySelector('img');
    expect(imgElement).toBeTruthy();
    expect(imgElement?.src).toContain('assets/greenwave.png');
    expect(imgElement?.alt).toBe('');

    const spanElement: HTMLSpanElement | null = h1Element.querySelector('span');
    expect(spanElement).toBeTruthy();
    expect(spanElement?.textContent).toContain('Task Application');
  });
  it('should call getStarted() method when the "Get Started" button is clicked', () => {
    spyOn(component, 'getStarted');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.getStarted).toHaveBeenCalled();
  });
});

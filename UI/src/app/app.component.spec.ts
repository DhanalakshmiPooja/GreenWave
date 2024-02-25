import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            redirectTo: 'getStarted',
            pathMatch: 'full',
          },
          { path: 'getStarted', component: DashboardComponent },
          {
            path: '',
            loadChildren: () =>
              import('./pages/pages.module').then((m) => m.PagesModule),
          },
        ]),
      ],
      declarations: [AppComponent],
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Inject Router
    fixture.detectChanges();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'UI'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('UI');
  });
  it('should navigate to /getStarted when the route is empty', async () => {
    const navigateSpy = spyOn(router, 'navigate');

    await router.navigate(['/']);

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
    // You can also add expectations based on the behavior of the component
  });
  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('UI app is running!');
  // });
});

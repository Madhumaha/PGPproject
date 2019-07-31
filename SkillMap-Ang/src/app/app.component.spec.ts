import { TestBed, async, getTestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserComponent } from './Users/user/user.component';
import { UserformComponent } from './Users/userform/userform.component';
import { UserlistComponent } from './Users/userlist/userlist.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserskillsPipe } from './Users/FilterUser/userskills.pipe';

describe('AppComponent', () => {

  let injector:any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
    ToastrModule.forRoot()
      ],
      declarations: [
        AppComponent,
        UserComponent,
         UserformComponent,
        UserlistComponent,
        UserskillsPipe
      ],
    }).compileComponents();
  }));

  // beforeEach(()=>{
  
  // })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'SkillMapping'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('SkillMapping');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to SkillMapping!');
  });
});

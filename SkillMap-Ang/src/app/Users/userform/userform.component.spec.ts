import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserformComponent } from './userform.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserskillsPipe } from '../FilterUser/userskills.pipe';

describe('UserformComponent', () => {
  let component: UserformComponent;
  let fixture: ComponentFixture<UserformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserformComponent],
      imports:[FormsModule,HttpClientModule,BrowserAnimationsModule,ToastrModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

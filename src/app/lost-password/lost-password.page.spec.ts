import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LostPasswordPage } from './lost-password.page';

describe('LostPasswordPage', () => {
  let component: LostPasswordPage;
  let fixture: ComponentFixture<LostPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostPasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LostPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

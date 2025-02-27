import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviserComponent } from './reviser.component';

describe('ReviserComponent', () => {
  let component: ReviserComponent;
  let fixture: ComponentFixture<ReviserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

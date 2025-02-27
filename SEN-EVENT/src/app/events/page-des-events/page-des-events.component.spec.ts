import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDesEventsComponent } from './page-des-events.component';

describe('PageDesEventsComponent', () => {
  let component: PageDesEventsComponent;
  let fixture: ComponentFixture<PageDesEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageDesEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDesEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

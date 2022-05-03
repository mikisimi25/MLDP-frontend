import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowlistsComponent } from './showlists.component';

describe('ShowlistsComponent', () => {
  let component: ShowlistsComponent;
  let fixture: ComponentFixture<ShowlistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowlistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

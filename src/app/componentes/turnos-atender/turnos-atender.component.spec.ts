import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosAtenderComponent } from './turnos-atender.component';

describe('TurnosAtenderComponent', () => {
  let component: TurnosAtenderComponent;
  let fixture: ComponentFixture<TurnosAtenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosAtenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosAtenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

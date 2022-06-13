import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSalasComponent } from './tabla-salas.component';

describe('TablaSalasComponent', () => {
  let component: TablaSalasComponent;
  let fixture: ComponentFixture<TablaSalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaSalasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

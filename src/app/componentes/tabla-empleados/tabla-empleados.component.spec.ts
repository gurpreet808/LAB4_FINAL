import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEmpleadosComponent } from './tabla-empleados.component';

describe('TablaEmpleadosComponent', () => {
  let component: TablaEmpleadosComponent;
  let fixture: ComponentFixture<TablaEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

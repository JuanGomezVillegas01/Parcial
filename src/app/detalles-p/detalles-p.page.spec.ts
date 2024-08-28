import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesPPage } from './detalles-p.page';

describe('DetallesPPage', () => {
  let component: DetallesPPage;
  let fixture: ComponentFixture<DetallesPPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

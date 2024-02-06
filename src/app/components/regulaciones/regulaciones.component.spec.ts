import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulacionesComponent } from './regulaciones.component';

describe('RegulacionesComponent', () => {
  let component: RegulacionesComponent;
  let fixture: ComponentFixture<RegulacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegulacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegulacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

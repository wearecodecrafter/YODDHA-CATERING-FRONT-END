import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Allowance } from './allowance';

describe('Allowance', () => {
  let component: Allowance;
  let fixture: ComponentFixture<Allowance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Allowance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Allowance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

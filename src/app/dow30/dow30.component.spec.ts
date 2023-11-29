import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dow30Component } from './dow30.component';

describe('Dow30Component', () => {
  let component: Dow30Component;
  let fixture: ComponentFixture<Dow30Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Dow30Component]
    });
    fixture = TestBed.createComponent(Dow30Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

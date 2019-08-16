import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullHistoryPage } from './full-history.page';

describe('FullHistoryPage', () => {
  let component: FullHistoryPage;
  let fixture: ComponentFixture<FullHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullHistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

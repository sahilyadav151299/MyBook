/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PackageDataComponent } from './package-data.component';

describe('PackageDataComponent', () => {
  let component: PackageDataComponent;
  let fixture: ComponentFixture<PackageDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

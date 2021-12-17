/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserPackagesService } from './user-packages.service';

describe('Service: UserPackages', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserPackagesService]
    });
  });

  it('should ...', inject([UserPackagesService], (service: UserPackagesService) => {
    expect(service).toBeTruthy();
  }));
});

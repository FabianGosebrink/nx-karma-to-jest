import { async, TestBed } from '@angular/core/testing';
import { SharedLib1Module } from './shared-lib1.module';

describe('SharedLib1Module', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedLib1Module]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedLib1Module).toBeDefined();
  });
});

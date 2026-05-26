import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasManager } from './ideas-manager';

describe('IdeasManager', () => {
  let component: IdeasManager;
  let fixture: ComponentFixture<IdeasManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeasManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeasManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

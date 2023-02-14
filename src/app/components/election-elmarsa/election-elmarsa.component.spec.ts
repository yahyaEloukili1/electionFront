import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionElmarsaComponent } from './election-elmarsa.component';

describe('ElectionElmarsaComponent', () => {
  let component: ElectionElmarsaComponent;
  let fixture: ComponentFixture<ElectionElmarsaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionElmarsaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionElmarsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionElmarsaSeleonBureauComponent } from './election-elmarsa-seleon-bureau.component';

describe('ElectionElmarsaSeleonBureauComponent', () => {
  let component: ElectionElmarsaSeleonBureauComponent;
  let fixture: ComponentFixture<ElectionElmarsaSeleonBureauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectionElmarsaSeleonBureauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionElmarsaSeleonBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

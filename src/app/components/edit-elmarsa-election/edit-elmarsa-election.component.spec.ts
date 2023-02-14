import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditElmarsaElectionComponent } from './edit-elmarsa-election.component';

describe('EditElmarsaElectionComponent', () => {
  let component: EditElmarsaElectionComponent;
  let fixture: ComponentFixture<EditElmarsaElectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditElmarsaElectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditElmarsaElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

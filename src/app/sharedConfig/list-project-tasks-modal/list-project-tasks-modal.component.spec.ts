import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjectTasksModalComponent } from './list-project-tasks-modal.component';

describe('ListProjectTasksModalComponent', () => {
  let component: ListProjectTasksModalComponent;
  let fixture: ComponentFixture<ListProjectTasksModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProjectTasksModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProjectTasksModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

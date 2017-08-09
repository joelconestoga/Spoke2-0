import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlparamComponent } from './urlparam.component';

describe('UrlparamComponent', () => {
  let component: UrlparamComponent;
  let fixture: ComponentFixture<UrlparamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlparamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlparamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

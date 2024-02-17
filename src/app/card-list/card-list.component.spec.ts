import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardListComponent } from './card-list.component';
import { CardService } from '../card/card.service';
import { of } from 'rxjs';
import mockData from '../../mockData.json';

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;
  let cardServiceSpy: any; // jasmine.SpyObj<CardService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CardService', ['getCards']);

    await TestBed.configureTestingModule({
      declarations: [CardListComponent],
      providers: [{ provide: CardService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    cardServiceSpy = TestBed.inject(CardService) as any; // jasmine.SpyObj<CardService>
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCards on ngOnInit', () => {
    const cards = mockData;
    cardServiceSpy.getCards.and.returnValue(of(cards));

    component.ngOnInit();

    expect(cardServiceSpy.getCards).toHaveBeenCalled();
    expect(component.cards).toEqual(cards);
    expect(component.filteredCards).toEqual(cards);
  });

  // it('should delete card', () => {
  //   const cards = mockData;

  //   component.cards = cards;
  //   component.filteredCards = cards;

  //   component.deleteCard(1);

  //   expect(component.cards.length).toBe(0);
  //   expect(component.filteredCards.length).toBe(0);
  // });

  // it('should filter cards', () => {
  //   const cards = mockData;
  //   component.cards = cards;

  //   component.searchTerm = 'test';
  //   component.filterCards();
  //   expect(component.filteredCards.length).toBe(1);

  //   component.searchTerm = 'description';
  //   component.filterCards();
  //   expect(component.filteredCards.length).toBe(1);

  //   component.searchTerm = 'Another';
  //   component.filterCards();
  //   expect(component.filteredCards.length).toBe(2);
  // });
});

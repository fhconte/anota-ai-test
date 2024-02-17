import { Component, OnInit } from '@angular/core';
import { Card } from '../card/card.interface';
import { CardService } from '../card/card.service';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  cards: Card[] = [];
  filteredCards: Card[] = [];
  searchTerm: string = '';

  constructor(public cardService: CardService) {}

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void {
    // Simulating API response
    this.cardService.getCards().subscribe(cards => {
      this.cards = cards;
      this.filteredCards = this.cards;
    });
  }

  deleteCard(id: number): void {
    // Remove card from the list
    this.cards = this.cards.filter(card => card.id !== id);
    this.filteredCards = this.filteredCards.filter(card => card.id !== id);
  }

  filterCards(): void {
    this.filteredCards = this.cards.filter(card =>
      card.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      card.type.includes(this.searchTerm.toLowerCase())
    );
  }
}

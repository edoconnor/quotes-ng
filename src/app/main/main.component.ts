import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quote } from '../models/quote';
import { QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  quotes: Quote[] = [];

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.quoteService.getDow30().subscribe(data => {
      this.quotes = data;
    });
  }
}


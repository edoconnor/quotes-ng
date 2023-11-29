import {
  Component,
  OnInit,
  AfterViewInit,
  QueryList,
  ViewChildren,
  ElementRef,
} from '@angular/core';

import { QuoteService } from '../services/quote.service';
import { Quote, QuoteResults } from '../models/quote';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dow30',
  templateUrl: './dow30.component.html',
  styleUrls: ['./dow30.component.css'],
})
export class Dow30Component implements OnInit, AfterViewInit {
  @ViewChildren('canvas') canvasElements!: QueryList<ElementRef>;
  charts: Chart[] = [];
  chartDataArray: any[] = [];

  loading = true;

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.quoteService.getDow30().subscribe((data) => {
      const results = this.processData(data);
      this.chartDataArray = Object.keys(results).map((symbol) => ({
        symbol: symbol,
        data: results[symbol],
      }));
      this.loading = false;
    });
  }

  ngAfterViewInit() {
    this.canvasElements.changes.subscribe(
      (canvasList: QueryList<ElementRef>) => {
        console.log('Canvas elements:', canvasList);
        console.log('Chart data:', this.chartDataArray);

        canvasList.forEach((canvasElement, index) => {
          const canvas = canvasElement.nativeElement;
          const chartInfo = this.chartDataArray[index];
          this.createChart(canvas, chartInfo);
        });
      }
    );
  }

  createChart(canvas: HTMLCanvasElement, chartInfo: any) {
    const chartData = {
      labels: chartInfo.data.dates.reverse(),
      datasets: [
        {
          label: chartInfo.symbol,
          data: chartInfo.data.closes.reverse(),
          borderWidth: 1,
          lineTension: 0.4,
          fill: {
            target: 'start',
            above: '#dcfce7',
          },
        },
      ],
    };

    const chartConfig = {
      type: 'line' as const,
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    };

    this.charts.push(new Chart(canvas, chartConfig));
  }

  processData(data: Quote[]): QuoteResults {
    const results: QuoteResults = {};

    for (const item of data) {
      if (!results[item.symbol]) {
        results[item.symbol] = {
          dates: [],
          closes: [],
        };
      }
      const date = new Date(item.date);
      // Format the date as MM/DD
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
      results[item.symbol].dates.push(formattedDate);
      results[item.symbol].closes.push(item.close);
    }

    return results;
  }
}

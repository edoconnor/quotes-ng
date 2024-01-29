import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { QuoteService } from '../services/quote.service';
import { Quote } from '../models/quote';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart: Chart | null = null;
  public symbol: string = '';
  public stockData: Quote[] = [];
  public companyName: string = '';
  loading = false;

  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.symbol = 'DJIA';
    this.fetchStockData();
  }

  ngAfterViewInit() {
    this.initializeChart();
  }

  private initializeChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Close Price',
              data: [], // Your data
              fill: true,

              backgroundColor: 'rgba(0, 123, 255, 0.2)',
              borderColor: '#007bff',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'MM/dd',
                },
              },
            },
            y: {},
          },
        },
      });
    }
  }

  fetchStockData() {
    if (this.symbol) {
      this.loading = true;
      this.fetchCompanyName(this.symbol);
      this.quoteService.get30DayChart(this.symbol).subscribe(
        (data) => {
          this.stockData = data;
          this.updateChartData();
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching stock data:', error);
          this.loading = false;
        }
      );
    } else {
      console.error('Symbol is required');
    }
  }

  private fetchCompanyName(symbol: string) {
    this.quoteService.getStockName(symbol).subscribe(
      (response: any) => {
        this.companyName =
          response && response.name ? response.name : 'Company name not found';
      },
      (error) => {
        console.error('Error fetching company data:', error);
        this.companyName = 'Company name not found';
      }
    );
  }

  private updateChartData() {
    if (!this.chart) {
      this.initializeChart();
    }
    this.chart!.data.labels = this.stockData.map((data) => data.date);
    this.chart!.data.datasets[0].data = this.stockData.map(
      (data) => data.close
    );

    this.chart!.update();
  }
}

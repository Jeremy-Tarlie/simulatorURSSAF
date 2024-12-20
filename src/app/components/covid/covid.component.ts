import { Component, OnInit } from '@angular/core';
import { CovidService } from '../../services/covid.service';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-covid',
  imports: [FormsModule, CommonModule],
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {
  data: any = null;
  country: string = '';
  chart: Chart | null = null;

  constructor(private covidService: CovidService) {}

  async ngOnInit() {
    this.data = await this.covidService.getCovidData();
    this.createChart();
  }

  createChart() {
    const covidData = {
      cases: this.data.cases,
      deaths: this.data.deaths,
      tests: this.data.tests
    };

    const data = {
      labels: ["Total Cases", "Deaths", "Tests Conducted"],
      datasets: [{
        label: `COVID Data - ${this.country || 'France'}`,
        data: [covidData.cases, covidData.deaths, covidData.tests],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Total Cases
          'rgba(255, 99, 132, 0.6)', // Deaths
          'rgba(54, 162, 235, 0.6)'  // Tests Conducted
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', 
          'rgba(255, 99, 132, 1)', 
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    };

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: `COVID-19 Data (${this.country || 'France'})`
          }
        }
      }
    };

    const canvas = document.getElementById('covidChart') as HTMLCanvasElement;
    if (canvas) {
      if (this.chart) {
        this.chart.destroy();
      }
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.chart = new Chart(ctx, config);
      } else {
        console.error('Failed to get 2D context');
      }
    } else {
      console.error('Failed to find canvas element');
    }
  }

  async submit() {
    this.data = await this.covidService.getCovidData(this.country);
    this.createChart();
  }
}
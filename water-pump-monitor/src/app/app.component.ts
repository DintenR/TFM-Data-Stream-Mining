import { Component } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip
} from "ng-apexcharts";
import { dataSeries } from "./data-series";
import { WaterPumpWebSocketService} from './water-pump-web-socket.service'

import { ReadingsServiceService } from './readings-service.service';
import * as moment from 'moment';
import Chart from 'chart.js/auto';
import { time } from 'node:console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'water-pump-monitor';
  // myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:8081/water-pump');
  public sensors: ApexAxisChartSeries[];
  public sensor00: ApexAxisChartSeries;
  public sensor01: ApexAxisChartSeries;
  public sensor02: ApexAxisChartSeries;
  public chart: ApexChart;
  public dataLabels: ApexDataLabels;
  public markers: ApexMarkers;
  public title: ApexTitleSubtitle;
  public fill: ApexFill;
  public yaxis: ApexYAxis;
  public xaxis: ApexXAxis;
  public tooltip: ApexTooltip;
  limit = 50;
  public lista = [
    "sensor00", "sensor01", "sensor02","sensor03", "sensor04", "sensor05","sensor06", "sensor07", "sensor08","sensor09",
    "sensor10", "sensor11", "sensor12","sensor13", "sensor14", "sensor15","sensor16", "sensor17", "sensor18","sensor19", 
    "sensor20", "sensor21", "sensor22","sensor23", "sensor24", "sensor25","sensor26", "sensor27", "sensor28","sensor29", 
    "sensor30", "sensor31", "sensor32","sensor33", "sensor34", "sensor35","sensor36", "sensor37", "sensor38","sensor39", 
    "sensor40", "sensor41", "sensor42","sensor43", "sensor44", "sensor45","sensor46", "sensor47", "sensor48","sensor49", 
    "sensor50", "sensor51"  
];
  public broken = true;
  public stompClient: any;
  canvas:any; ctx:any; myChart:any;
  selectedDataSet = 0;
  datasets = [];

  aux = 1;

  constructor(private waterPumpService:WaterPumpWebSocketService,
              private readingsService:ReadingsServiceService) {
    //this.initChartData();
  }
  
  ngOnInit() {
    this.connect();
    this.lista.forEach(element => {
      this.datasets.push([]);
    });
    this.createChart();
  }

  createChart(){
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');

    this.myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
          labels: [],
          datasets: [{
              label: this.lista[this.selectedDataSet],
              data: [],
              backgroundColor: ["blue"],
              borderWidth: 2
          }]
      },
      options: {
        animation : false,
    legend: {
        display: true
    },
        responsive: true,
        display:true,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
      }
    });

  }

  addDataPoint(): void {
    this.datasets[0].push(this.aux);
    this.datasets[1].push((this.aux * -1));
    this.datasets[2].push(this.aux*10);
    this.myChart.data.labels.push(this.aux);
    this.updateChart();
    this.aux++;
  }

  updateChart(){
    this.myChart.data.datasets[0].data = this.datasets[this.selectedDataSet];
    this.myChart.update();
  }

  cambiaGrafica(numero:number){
    this.selectedDataSet = numero;
    this.myChart.data.datasets[0].label = this.lista[this.selectedDataSet];
    this.updateChart();
    console.log(this.selectedDataSet);
  }

  connect(): void {
    this.waterPumpService.connect();

    this.readingsService.eventEmiter.subscribe( data => {
      //   console.log(data.body);
      //   let lecturas = data.body.split(",");
      //   status = lecturas[lecturas.length-1];
      //   if(status == "NORMAL"){
      //     this.broken = false;
      //   }else{
      //     this.broken = true;
      //   }
      //   let date = moment(lecturas[1], 'YYYY-MM-DD hh:mm:ss');
      //   console.log(date);
      // 
      this.parseDataAndUpdate(data.body);
    });


  }

  disconnect(): void {
    this.waterPumpService.disconnect();
  }
  public addDataToChart(data: string): void {
    var msg = JSON.parse(data);
    var time = new Date(msg.date);
    var timeStr = time.toLocaleTimeString();

  }

  parseDataAndUpdate(data:string){
    //Split the incoming csv string
    let fields = data.split(",");
    //Get date and change format to dd-mm-yyyy
    let date = this.changeDateFormat(fields[1]);
    console.log('la fecha es:'+ date);
    //Add date to labels in the graph
    this.myChart.data.labels.push(date);
    //Get machine status
    status = fields[fields.length-1];
    if(status == "NORMAL"){
      this.broken = false;
    }else{
      this.broken = true;
    }
    // get readings from sensors
    for(let i=0;i<this.lista.length;i++){
      this.datasets[i].push(this.parseReading(fields[(i+2)]))
      if(this.myChart.data.labels.length > this.limit){
        this.datasets[i].shift();
      }
      console.log(this.datasets[i]);
    }
    if(this.myChart.data.labels.length > this.limit){
      this.myChart.data.labels.shift();
    }
    this.updateChart();
  }
  private parseReading(reading:string): number{
    let parsedReading=0;
    if(reading == ''){//if string comes empty
      parsedReading = Number.NaN
    }else{
      parsedReading = parseFloat(reading);
    }
    return parsedReading;
  }

  private changeDateFormat(date:string): string {
    //Date comes in the following format 'YYYY-MM-DD hh:mm:ss'
    date = date.substring(0,10);
    let dateparts = date.split("-");
    date = dateparts[2]+'-'+dateparts[1]+'-'+dateparts[0];
    return date;
  }

  // public initChartData(): void {
  //   let ts2 = 1484418600000;
  //   let dates00 = [];
  //   let dates01 = [];
  //   let dates02 = [];
  //   for (let i = 0; i < 120; i++) {
  //     ts2 = ts2 + 86400000;
  //     dates00.push([ts2, dataSeries[0][i].value]);
  //     dates01.push([ts2, dataSeries[1][i].value]);
  //     dates02.push([ts2, dataSeries[2][i].value]);
  //   }

  //   this.sensor00 = [
  //     {
  //       name: "sensor00",
  //       data: dates00
  //     }
  //   ];
  //   this.sensor01 = [
  //     {
  //       name: "Sensor01",
  //       data: dates01
  //     }
  //   ];
  //   this.sensor02 = [
  //     {
  //       name: "Sensor02",
  //       data: dates02
  //     }
  //   ];
  //   this.sensors = [this.sensor00, this.sensor01, this.sensor02];
  //   this.chart = {
  //     type: "area",
  //     stacked: false,
  //     height: 350,
  //     redrawOnParentResize: true,
  //     width: "100%",
  //     zoom: {
  //       type: "x",
  //       enabled: true,
  //       autoScaleYaxis: true
  //     },
  //     toolbar: {
  //       autoSelected: "zoom"
  //     }
  //   };
  //   this.dataLabels = {
  //     enabled: false
  //   };
  //   this.markers = {
  //     size: 0
  //   };
  //   this.title = {
  //     text: "Sensor00",
  //     align: "left"
  //   };
  //   this.fill = {
  //     type: "gradient",
  //     gradient: {
  //       shadeIntensity: 1,
  //       inverseColors: false,
  //       opacityFrom: 0.5,
  //       opacityTo: 0,
  //       stops: [0, 90, 100]
  //     }
  //   };
  //   this.yaxis = {
  //     labels: {
  //       formatter: function (val) {
  //         return (val / 1000000).toFixed(0);
  //       }
  //     },
  //     title: {
  //       text: "Price"
  //     }
  //   };
  //   this.xaxis = {
  //     type: "datetime"
  //   };
  //   this.tooltip = {
  //     shared: false,
  //     y: {
  //       formatter: function (val) {
  //         return (val / 1000000).toFixed(0);
  //       }
  //     }
  //   };
  // }
  // change_title(title: string) {
  //   console.log('Antes:' + this.title.text)
  //   this.title.text = title;
  //   console.log('Despuest:' + this.title.text)
  // }
  // addData(){
  //   console.log(this.sensor00[0].data[1]);

 
  // }
}

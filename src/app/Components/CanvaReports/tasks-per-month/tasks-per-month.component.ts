import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../../assets/canvasjs/canvasjs.min';
@Component({
  selector: 'app-tasks-per-month',
  templateUrl: './tasks-per-month.component.html',
  styleUrls: ['./tasks-per-month.component.css']
})
export class TasksPerMonthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Calls the function that render the task per month chart
    this.renderChart();
  }
  // Render the task per month chart
  public renderChart() {

    function toolTipContent(e) {
      var str = '';
      var total = 0;
      var str2, str3;
      
      for (var i = 0; i < e.entries.length; i++) {
        var str1 = "<span style= \"color:" + e.entries[i].dataSeries.color + "\"> " + e.entries[i].dataSeries.name + "</span>: <strong>" + e.entries[i].dataPoint.y + "</strong><br/>";
        total = e.entries[i].dataPoint.y + total;
        str = str.concat(str1);
      }
      str2 = '<span style = "color:DodgerBlue;"><strong>' + (e.entries[0].dataPoint.x).getFullYear() + '</strong></span><br/>';
      total = Math.round(total * 100) / 100;
      str3 = '<span style = "color:Tomato">Total:</span><strong> ' + total + '</strong><br/>';
      return (str2.concat(str)).concat(str3);
    }

    let chart = new CanvasJS.Chart('chartContainer2', {
      animationEnabled: true,
      title: {
        text: 'Tareas por mes y area',
        fontFamily: 'arial black',
        fontColor: '#695A42',
      },
      axisX: {
        interval: 1,
        intervalType: 'year',
      },
      axisY: {
        valueFormatString: '$#0bn',
        gridColor: '#B6B1A8',
        tickColor: '#B6B1A8'
      },
      toolTip: {
        shared: true,
        content: toolTipContent,
      },
      data: [{
        type: 'stackedColumn',
        showInLegend: true,
        color: '#0F1C37',
        name: 'CGO - CSR',
        dataPoints: [
          { y: 6, x: new Date(2010, 0) },
          { y: 8, x: new Date(2011, 0) },
          { y: 10, x: new Date(2012, 0) },
          { y: 13, x: new Date(2013, 0) },
          { y: 15, x: new Date(2014, 0) },
          { y: 17, x: new Date(2015, 0) },
          { y: 20, x: new Date(2016, 0) }
        ]
      },
      {
        type: 'stackedColumn',
        showInLegend: true,
        name: 'ADCAR',
        color: '#293064',
        dataPoints: [
          { y: 6, x: new Date(2010, 0) },
          { y: 9, x: new Date(2011, 0) },
          { y: 11, x: new Date(2012, 0) },
          { y: 14, x: new Date(2013, 0) },
          { y: 15, x: new Date(2014, 0) },
          { y: 17, x: new Date(2015, 0) },
          { y: 21, x: new Date(2016, 0) }
        ]
      },
      {
        type: 'stackedColumn',
        showInLegend: true,
        name: 'SEDICAR',
        color: '#007BFF',
        dataPoints: [
          { y: 7, x: new Date(2010, 0) },
          { y: 9, x: new Date(2011, 0) },
          { y: 13, x: new Date(2012, 0) },
          { y: 14, x: new Date(2013, 0) },
          { y: 18, x: new Date(2014, 0) },
          { y: 18, x: new Date(2015, 0) },
          { y: 22, x: new Date(2016, 0) }
        ]
      },
      {
        type: 'stackedColumn',
        showInLegend: true,
        name: 'Soporte',
        color: '#D4DEF3',
        dataPoints: [
          { y: 8, x: new Date(2010, 0) },
          { y: 10, x: new Date(2011, 0) },
          { y: 14, x: new Date(2012, 0) },
          { y: 16, x: new Date(2013, 0) },
          { y: 10, x: new Date(2014, 0) },
          { y: 21, x: new Date(2015, 0) },
          { y: 26, x: new Date(2016, 0) }
        ]
      }]
    });

    chart.render();
  }
}

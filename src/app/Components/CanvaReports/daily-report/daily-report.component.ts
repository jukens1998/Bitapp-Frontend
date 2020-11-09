import { Component, OnInit } from '@angular/core';
import { BinacleService } from 'src/app/Services/BinacleServices/binacle-services.service';
import { ReportsService } from 'src/app/Services/Reports/reports.service';
import * as CanvasJS from '../../../../assets/canvasjs/canvasjs.min';


@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css']
})
export class DailyReportComponent implements OnInit {
// array that contains the data that will be render on the canvas
public projectsDataReport: any[];

constructor(private reports: ReportsService, private binacle:BinacleService) { }
  ngOnInit() {


    this.canvas();
  }
  public canvas() {
    this.binacle.getTasks().subscribe((result: any[]) => {
      this.projectsDataReport = result;
      let chart = new CanvasJS.Chart('chartContainer1', {
        theme: 'light2',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Reporte laboral',
        },
        data: [{
          type: 'pie',
          showInLegend: true,
          toolTipContent: '<b>{name}</b>: {y} (#percent%)',
          indexLabel: '{name} - #percent%',
          dataPoints: [
          ],
        }],
      });
      // Set values on the canva
      for (let i = 0; i < result.length; i++) {
        console.log(result);
        chart.options.data[0].dataPoints.push({ y: result[i][2], name: result[i][1]});
      }

      chart.render();
    }, (err) => {
      console.log(err);
    });

  }
}

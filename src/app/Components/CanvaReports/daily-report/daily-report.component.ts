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

  constructor(private reports: ReportsService, private binacle: BinacleService) { }
  ngOnInit() {
    // Render the main canvas
    this.canvas();
  }
  public canvas() {
    this.binacle.getTasks().subscribe((result: any[]) => {
      // Data from porjects
      this.projectsDataReport = result;

      CanvasJS.addColorSet("greenShades",
        [//colorSet Array
          "#0F1C37",
          "#293064",
          "#007BFF",
          "#D4DEF3",
          "#333F4F"
        ]);

      let chart = new CanvasJS.Chart('chartContainer1',
        {
          theme: 'light2',
          animationEnabled: true,
          exportEnabled: true,
          colorSet: "greenShades",
          title: {
            text: 'Reporte laboral',
          },
          data: [{
            type: 'pie',
            showInLegend: false,
            toolTipContent: '<b>{name}</b>: {y} (#percent%)',
            indexLabel: '{name} - #percent%',
            dataPoints: [
            ],
          }],
        });
      // Set values on the canva
      for (let i = 0; i < result.length; i++) {
        console.log(result);
        chart.options.data[0].dataPoints.push({ y: result[i][2], name: result[i][1] });
      }

      chart.render();
    }, (err) => {
      console.log(err);
    });

  }
}

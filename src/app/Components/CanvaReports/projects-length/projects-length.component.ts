import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/Services/Reports/reports.service';
import * as CanvasJS from '../../../../assets/canvasjs/canvasjs.min';

@Component({
  selector: 'app-projects-length',
  templateUrl: './projects-length.component.html',
  styleUrls: ['./projects-length.component.css']
})
export class ProjectsLengthComponent implements OnInit {
// array that contains the data that will be render on the canvas
  public projectsDataReport: any[];

  constructor(private reports: ReportsService) { }

  public ngOnInit() {
    // Render graphic content 
    this.canvas();
  }

  // Render the canvas and inside there is an observable from a service to manage the data to set on the canva
  public canvas() {
    this.reports.projectsReport().subscribe((result: any[]) => {
      this.projectsDataReport = result;
      let chart = new CanvasJS.Chart('chartContainer', {
        theme: 'light2',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Duración de proyectos por días',
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
        var amountDays = Number(result[i][1]) * Number(result[i][2]);
        chart.options.data[0].dataPoints.push({ y: amountDays, name: result[i][0] });
      }

      chart.render();
    }, (err) => {
      console.log(err);
    });

  }

}

import { Component, HostListener, OnInit } from '@angular/core';
import { DateService } from '../../Services/Date/date.service';
import { PAcsService } from '../../Services/PAcs/pacs.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public options: boolean=false;
  constructor(private pac: PAcsService, private date: DateService) { }

  public ngOnInit(): void { }
}

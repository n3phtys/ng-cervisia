import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ParametersPurchaseLogGlobal, ParametersPurchaseLogGlobalCount } from '../backend-types';

const ONE_MONTH: number = 1000 * 60 * 60 * 24 * 30;

@Component({
  selector: 'app-timespan-filter',
  templateUrl: './timespan-filter.component.html',
  styleUrls: ['./timespan-filter.component.css']
})
export class TimespanFilterComponent implements OnInit {
  startDate: Date = new Date();
  endDate: Date = new Date();


  @Input() set timespan(value: ParametersPurchaseLogGlobalCount) {
    this.startDate = new Date(value.millis_start);
    this.endDate = new Date(value.millis_end);
    console.log("Timespan Input changed:");
    console.log(this);
  }
  @Output() onTimespanFilterChange = new EventEmitter<ParametersPurchaseLogGlobalCount>();

  constructor() { }

  ngOnInit() {
    const now = new Date().getTime();
    this.startDate = new Date(0);
    this.endDate = new Date(now);
    console.log("Initialized timespan filter:");
    console.log(this);
    this.timespanChanged();
  }

  timespanChanged() {
    console.log("Timespan changed:");
    console.log(this);
    if (this.endDate != null && this.startDate != null && this.startDate.getTime() <= this.endDate.getTime()) {
    this.onTimespanFilterChange.emit({
      millis_start: this.startDate.getTime(),
      millis_end: this.endDate.getTime(),
    });
  }
  }

  endChanged(event) {
    console.log("endChanged:");
    console.log(event);
    const c = new Date(event).getTime();
    if (!Number.isNaN(c)) {
      this.endDate = new Date(c);
      this.endDate.setHours(23);
      this.endDate.setMinutes(59);
      this.endDate.setSeconds(59);
      console.log("set end date to");
      console.log(this.endDate);
      this.timespanChanged();
    } else {
      console.log("Incoming date event was NaN");
    }
  }

  startChanged(event) {
    console.log("startChanged:");
    console.log(event);
    const c = new Date(event).getTime();
    if (!Number.isNaN(c)) {
      this.startDate = new Date(c);
      this.startDate.setHours(0);
      this.startDate.setMinutes(0);
      this.startDate.setSeconds(0);
      this.timespanChanged();
    } else {
      console.log("Incoming date event was NaN");
    }
  }

}

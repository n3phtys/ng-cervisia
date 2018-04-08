import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatedResult } from '../backend.service';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {


private _pageSize: number = -1;

@Input() set pageSizeOverride(value: number) {
  this._pageSize = value;
  this.inputChanged();
}

get pageSizeOverride(): number {
  return this._pageSize;
}


  private _parameters: PaginatedResult<any> = {
    from: 0,
    to: 0,
    results: [],
    total_count: 0,
  };

  @Input() set parameters(value: PaginatedResult<any>) {
    this._parameters = value;
    this.inputChanged();
  }

  get parameters(): PaginatedResult<any> {
    return this._parameters;
  }

  @Output() onPageChange = new EventEmitter<number>();

  public pages: Array<number> = [];
  public numberOfPages: number = 0;
  public selectedPage: number = 0;
  public hasNoNextPage: boolean = false;
  public hasNoPreviousPage: boolean = false;


  constructor() { 
    this.inputChanged();
  }

  private computePageSize() {
    const myd = new Date();
    console.log("pagesize = " + this._pageSize)
    console.log("computing page size in paginator: "+ myd.toISOString);
    if (this._pageSize == -1) {
      this._pageSize = Math.max(1, this._parameters.to - this._parameters.from);
    }
    console.log("vals:")
    console.log(this._parameters.total_count);
    console.log(this._pageSize);
    this.numberOfPages = Math.ceil(this._parameters.total_count / this._pageSize);
    if (this.numberOfPages < 0 || Number.isNaN(this.numberOfPages) || !Number.isFinite(this.numberOfPages)) {
      this.numberOfPages = 1;
    }
    this.selectedPage = Math.floor(this._parameters.from / this._pageSize);
    const c = Math.min(this.selectedPage, this.numberOfPages - 1);
    const d = c > 0 ? c : 0;
    this.selectedPage = d;
    console.log("done with computation in paginator: "+ myd.toISOString);
    console.log("after computePageSize:");
    console.log(this);
  }

  private computePages() {
    console.log("Computing pages");
    let a = [];
    for (let i = 0; i < this.numberOfPages; i++) {
      //console.log("Page " + i);
      if (i >= this.selectedPage - 4 && i <= this.selectedPage + 4) {
        a.push(i);
     }
    }
    this.pages = a;
  }

  private setButtonVisibility() {
    console.log("setting button visibility");
    this.hasNoNextPage = this.selectedPage >= (this.pages.length - 1);
    this.hasNoPreviousPage = this.selectedPage <= 0;

    console.log("buttons set:");
    console.log(this);
  }

  private inputChanged() {
    console.log("inputChanged was called");
    this.computePageSize();
    this.computePages();
    this.setButtonVisibility();
  }

  goToNextPage() {
    const page = this.selectedPage + 1;
    this.onPageChange.emit(page);
  }

  goToPreviousPage() {
    const page = this.selectedPage - 1;
    this.onPageChange.emit(page);
  }
  goToFirstPage() {
    const page = 0;
    this.onPageChange.emit(page);
  }

  goToLastPage() {
    const page = this.numberOfPages - 1;
    this.onPageChange.emit(page);
  }

  goToPage(i: number) {
    this.onPageChange.emit(i);
  }
}

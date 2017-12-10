import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatedResult } from '../backend.service';

export class NavigationEvent {

}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {

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
  public pageSize: number = 0;
  public selectedPage: number = 0;
  public hasNoNextPage: boolean = false;
  public hasNoPreviousPage: boolean = false;


  constructor() { 
    this.inputChanged();
  }

  private computePageSize() {
    this.pageSize = this._parameters.to - this._parameters.from;
    this.numberOfPages = Math.ceil(this._parameters.total_count / this.pageSize);
    this.selectedPage = Math.floor(this._parameters.from / this.pageSize);
    const c = Math.min(this.selectedPage, this.numberOfPages - 1);
    const d = c > 0 ? c : 0;
    this.selectedPage = d;
  }

  private computePages() {
    let a = [];
    for (let i = 0; i < this.numberOfPages; i++) {
      if (i >= this.selectedPage - 4 && i <= this.selectedPage + 4) {
        a.push(i);
      }
    }
    this.pages = a;
  }

  private setButtonVisibility() {
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

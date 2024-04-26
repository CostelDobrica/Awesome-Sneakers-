import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  public onSearch(value: string): void {
    this.searchTextChanged.emit(value);
  }
}

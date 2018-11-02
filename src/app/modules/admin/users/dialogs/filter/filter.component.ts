import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'zerofee-app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filter = {
    username: '',
    email_filter: ''
  };
  constructor(
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public filters: any
  ) {}
  ngOnInit() {
    this.filter.username = this.filters.username;
    this.filter.email_filter = this.filters.email_filter;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

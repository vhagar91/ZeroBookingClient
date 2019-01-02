import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {
  DropzoneComponent,
  DropzoneConfigInterface,
  DropzoneDirective
} from 'ngx-dropzone-wrapper';
import { listingsUploadPictures } from '@app/core/app.config';
import { environment } from '@env/environment';

@Component({
  selector: 'zerofee-app-addpictures',
  templateUrl: './addpictures.component.html',
  styleUrls: ['./addpictures.component.scss']
})
export class AddpicturesComponent implements OnInit {
  public disabled: false;
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 20,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  constructor(
    public dialogRef: MatDialogRef<AddpicturesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.config.url =
      environment.BaseUrl +
      listingsUploadPictures +
      this.data.listing +
      '/?apikey=' +
      environment.apiKey;
    this.config.paramName = 'normal';
    this.config.params = { listing: this.data.listing };
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }
}

import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem } from '@ngx-gallery/core';

@Component({
  selector: 'zerofee-app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {
  items: GalleryItem[];
  constructor() {}

  ngOnInit() {
    this.items = [
      new ImageItem({
        src: 'http://localhost:8000/media/users/IMAG0070_1_2.jpg',
        thumb: 'http://localhost:8000/media/users/IMAG0070_1_2.jpg'
      }),
      new ImageItem({
        src: 'http://localhost:8000/media/users/IMAG0070_1_2.jpg',
        thumb: 'http://localhost:8000/media/users/IMAG0070_1_2.jpg'
      }),
      new ImageItem({
        src: 'http://localhost:8000/media/users/IMAG0070_1_2.jpg',
        thumb: 'http://localhost:8000/media/users/IMAG0070_1_2.jpg'
      }),
      new ImageItem({
        src: 'http://localhost:8000/media/users/IMAG0070_1_2.jpg',
        thumb: 'http://localhost:8000/media/users/IMAG0070_1_2.jpg'
      }),
      new ImageItem({
        src: 'http://localhost:8000/media/users/IMAG0070_1_2.jpg',
        thumb: 'http://localhost:8000/media/users/IMAG0070_1_2.jpg'
      }),
      new ImageItem({
        src: 'http://localhost:8000/media/users/IMAG0070_1_2.jpg',
        thumb: 'http://localhost:8000/media/users/IMAG0070_1_2.jpg'
      }),
      new ImageItem({
        src: 'http://localhost:8000/media/users/IMAG0070_1_2.jpg',
        thumb: 'http://localhost:8000/media/users/IMAG0070_1_2.jpg'
      }),
      new ImageItem({
        src: 'http://localhost:8000/media/users/IMAG0070_1_2.jpg',
        thumb: 'http://localhost:8000/media/users/IMAG0070_1_2.jpg'
      })
    ];
  }
}

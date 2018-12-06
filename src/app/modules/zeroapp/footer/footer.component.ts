import { Component, OnInit } from '@angular/core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons/faGooglePlusG';

@Component({
  selector: 'zerofee-app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  facebook = faFacebookF;
  google = faGooglePlusG;
  constructor() {}

  ngOnInit() {}
}

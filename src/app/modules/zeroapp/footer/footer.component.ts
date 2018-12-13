import { Component, OnInit } from '@angular/core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons/faGooglePlusG';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons/faMailBulk';
import { faLaptop } from '@fortawesome/free-solid-svg-icons/faLaptop';
@Component({
  selector: 'zerofee-app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  facebook = faFacebookF;
  google = faGooglePlusG;
  home = faHome;
  phone = faPhone;
  mail = faMailBulk;
  pc = faLaptop;
  constructor() {}

  ngOnInit() {}
}

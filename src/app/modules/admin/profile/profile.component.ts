import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '@app/model/profile';
@Component({
  selector: 'zerofee-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const userId = this.activatedRoute.snapshot.paramMap.get('id');
  }
}

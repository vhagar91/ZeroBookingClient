import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '@app/model/profile';
import { Subject } from 'rxjs';
import { getProfileState, State } from '@app/modules/admin/admin.state';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { ActionGetProfile } from '@app/modules/admin/profile/reducer/profile.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'zerofee-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  profile: Profile;
  profileForm: FormGroup;
  private userId;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<State>
  ) {
    this.profileForm = new FormGroup({
      // I assume that data which is received from your WEBAPI contains a key usernames and want to set this in your formControl
      userName: new FormControl(this.profile ? this.profile.username : '', [
        <any>Validators.required
      ]),
      lastName: new FormControl(this.profile ? this.profile.last_name : '', [
        <any>Validators.required
      ]),
      firstName: new FormControl(this.profile ? this.profile.first_name : '', [
        <any>Validators.required
      ]),
      email: new FormControl(this.profile ? this.profile.email : '', [
        <any>Validators.required,
        Validators.email
      ]),
      aboutMe: new FormControl(this.profile ? this.profile.about_me : ''),
      gender: new FormControl(this.profile ? this.profile.gender : '', [
        <any>Validators.required
      ]),
      address: new FormControl(this.profile ? this.profile.address : '', [
        <any>Validators.required
      ]),
      country: new FormControl(this.profile ? this.profile.country : '', [
        <any>Validators.required
      ]),
      city: new FormControl(this.profile ? this.profile.city : '', [
        <any>Validators.required
      ])
    });
  }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.subscribeToProfile();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  private subscribeToProfile() {
    this.store
      .pipe(
        select(getProfileState),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        profile => {
          if (profile) {
            this.profile = profile.profile;
            console.log(profile);
            this.SetProfileForm();
          }
        },
        error1 => {}
      );
    this.getProfile();
  }

  getProfile(): void {
    const payload = {
      userId: this.userId
    };
    this.store.dispatch(new ActionGetProfile(payload));
  }

  SetProfileForm() {
    this.profileForm.patchValue({
      username: this.profile ? this.profile.username : '',
      lastName: this.profile ? this.profile.last_name : '',
      firstName: this.profile ? this.profile.first_name : '',
      email: this.profile ? this.profile.email : '',
      aboutMe: this.profile ? this.profile.about_me : '',
      gender: this.profile ? this.profile.gender : '',
      address: this.profile ? this.profile.address : '',
      country: this.profile ? this.profile.country : '',
      city: this.profile ? this.profile.city : ''
    });
  }
}

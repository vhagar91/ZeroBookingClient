import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/modules/admin/users/state/user';
import { Group } from '@app/modules/admin/users/state/group';
import { ActionUpdateProfile } from '@app/modules/admin/profile/reducer/profile.actions';
import { Store } from '@ngrx/store';
import { State } from '@app/modules/admin/admin.state';
import { ActionAddUser } from '@app/modules/admin/users/reducer/users.actions';

@Component({
  selector: 'zerofee-app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  groups: Group[];
  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private store: Store<State>
  ) {
    this.userForm = new FormGroup({
      // I assume that data which is received from your WEBAPI contains a key usernames and want to set this in your formControl
      username: new FormControl(this.user ? this.user.username : '', [
        <any>Validators.required
      ]),
      last_name: new FormControl(this.user ? this.user.last_name : '', [
        <any>Validators.required
      ]),
      first_name: new FormControl(this.user ? this.user.first_name : '', [
        <any>Validators.required
      ]),
      email: new FormControl(this.user ? this.user.email : '', [
        <any>Validators.required,
        Validators.email
      ]),
      is_staff: new FormControl(false, [<any>Validators.required]),
      password: new FormControl('', [<any>Validators.required]),
      group: new FormControl('', [<any>Validators.required])
    });
  }
  ngOnInit() {
    this.groups = [{ name: 'Admin' }, { name: 'Client' }];
  }

  submit() {
    const newUser = this.userForm.value;
    const payload = {
      user: newUser
    };
    this.store.dispatch(new ActionAddUser(payload));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

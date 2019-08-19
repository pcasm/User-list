import {Component, ViewChild} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {User} from '../../models/users.Model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  @ViewChild('UserForm', {static: false}) UserForm;

  public users: User;

  public current_name: string;
  public current_username: string;
  public current_email: string;
  public current_street: string;
  public current_suite: string;
  public current_zip: string;
  public current_city: string;
  public current_phone: string;
  public current_website: string;
  public current_company_name: string;
  public current_company_catch_phrase: string;
  public current_company_bs: string;
  public current_index: number;

  public showingItem = false;

  constructor(private usersService: UsersService) {
    this.laodUsers();
  }

  itemSelected(item) {
    this.current_name = item.name;
    this.current_username = item.username;
    this.current_email = item.email;
    this.current_street = item.address.street;
    this.current_zip = item.address.zipcode;
    this.current_suite = item.address.suite;
    this.current_city = item.address.city;
    this.current_phone = item.phone;
    this.current_website = item.website;
    this.current_company_name = item.company.name;
    this.current_company_catch_phrase = item.company.catchPhrase;
    this.current_company_bs = item.company.bs;
    this.current_index = item.id;
    this.showingItem = true;
  }

  onSubmit() {
      this.usersService.createUser(
        this.current_name,
        this.current_username,
        this.current_email,
        this.current_street,
        this.current_suite,
        this.current_city,
        this.current_zip,
        this.current_phone,
        this.current_website,
        this.current_company_name,
        this.current_company_catch_phrase,
        this.current_company_bs)
        .subscribe(data => {
          window.alert('User created!');
          this.UserForm.reset();
          this.laodUsers();
          }, error => {
          window.alert('Error creating a new user');
          this.UserForm.reset();
        });
  }

  public laodUsers() {
    this.usersService.getData()
      .subscribe( data => {
        this.users = data;
      }, error => {window.alert('Error loading users list'); });
  }

  public deleteUser() {
    this.usersService.deleteUser(this.current_index)
      .subscribe(data => {
        window.alert('User deleted!');
        this.UserForm.reset();
        this.laodUsers();
        }, error => {
        window.alert('Error deleting the user');
        this.UserForm.reset();
      });
  }

}

import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  errMessage: string = '';
  constructor(private as: AuthService, private user: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  signup(form: NgForm) {
    this.as.signup(form.value.email, form.value.password).then(data => {
      this.user.addNewUser(data.user.uid, form.value.name, form.value.address, false); //form.value.isAdmin);
      this.errMessage = '';
      this.router.navigate(['/']);
    })
    .catch(err => this.errMessage = err);
  }

}

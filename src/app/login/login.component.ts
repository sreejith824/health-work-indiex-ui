import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : string; 
  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(user: string) {
    this.router.navigate(["app-user-dashboard", user]);
  }

}

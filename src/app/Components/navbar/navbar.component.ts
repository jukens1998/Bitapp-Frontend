import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/Services/auth/firebase-auth.service';
@Component({
  selector: 'app-navbar',
  styleUrls: ['./navbar.component.css'],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  constructor(private fireAuth: FirebaseAuthService, public router: Router) { }

  public ngOnInit(): void {
  }
  // Firebase function that logs out the active user
  public logOut() {
    this.fireAuth.logout();
    this.router.navigateByUrl('/login');
  }
}

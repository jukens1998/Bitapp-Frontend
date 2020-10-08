import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { FirebaseAuthService } from 'src/app/Services/auth/firebase-auth.service';
import { UserIdService } from 'src/app/Services/User/user-id.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  // model to manage user on the login
  public user: UserModel = new UserModel();

  constructor(private fireAuth: FirebaseAuthService, private router: Router, private userId: UserIdService) { }

  public ngOnInit(): void {
    if (this.fireAuth.logInState) {
      this.router.navigateByUrl('/home');
    }
  }
  // Submit to validate with firebase the access
  public onSubmit(form: NgForm) {
    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor',
    });
    Swal.showLoading();

    this.fireAuth.logIn(this.user).subscribe(() => {
      Swal.close();
      this.userId.setUserId(this.user.email);
      console.log(this.userId.getUserId());
      this.router.navigateByUrl('/home');
    }, (err) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        text: 'Revisa tus credenciales antes de acceder',
        title: 'Error al autenticar',
      });
      console.log(err);
    });

  }
}

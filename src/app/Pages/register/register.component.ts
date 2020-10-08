import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from "../../models/user.model";
import { FirebaseAuthService } from "../../Services/auth/firebase-auth.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuario: UserModel;

  constructor( private auth: FirebaseAuthService,
               private router: Router ) { }

  ngOnInit() {
    this.usuario = new UserModel();
  }

  onSubmit( form: NgForm ) {

    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor',
    });
    Swal.showLoading();

    this.auth.register( this.usuario )
      .subscribe( resp => {

        console.log(resp);
        Swal.close();   

        this.router.navigateByUrl('/home');

      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          text: 'Revisa tus credenciales antes de acceder',
          title: 'Error al autenticar',
        });
      });
  }


}

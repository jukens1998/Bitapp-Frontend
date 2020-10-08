import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY] sign in with email and password
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY] sign up with email ad password
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyDVx424iFMhlbHkqH8Od37DiXxhzzdLStA';

  // Variable de manejo de token
  private userTokenId = '';

  constructor(private http: HttpClient) { }

   // Erase the localstorage token id
   public logout() {
    localStorage.removeItem('token');
  }

  public logIn(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true,
    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`,
      authData,
    ).pipe(
      map((resp) => {
        this.saveToken(resp['idToken']);
      }),
    );
  }

  // register the actual user located on the user model
  public register(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true,
    };
    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`,
      authData,
    ).pipe(
      map((resp) => {
        this.saveToken(resp['idToken']);
      }),
    );
  }

  // Save the token response 
  public saveToken(tokenID: string) {
    this.userTokenId = tokenID;
    localStorage.setItem('token', tokenID);
  }

  //Redas the token that firebase provides
  public readToken() {
    if (localStorage.getItem('token')) {
      this.userTokenId = localStorage.getItem('token');
    } else {
      this.userTokenId = '';
    }
  }

  // Revision si el usuario cuenta con un usuario activo
  public logInState(): boolean {
    this.readToken();
    return this.userTokenId.length > 2;
  }
}

import {User} from './user.model';
import {AuthData} from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService{

    authChange = new Subject<boolean>();    
    private isAuthenticated = false;

   /* registerUser(authData: AuthData){
        this.user={
            email: authData.email,
            userId: Math.round(Math.random()*10000).toString()
        };
    }*/

    constructor(private router:Router, private afAuth:AngularFireAuth){

    }

    login(authData: AuthData){
        this.afAuth.signInWithEmailAndPassword(
            authData.email,
            authData.password).then(result=>{
                this.authSuccesfully();
            })
            .catch(error=>{
                window.alert(error);
            });
    }

    logout(){
        this.afAuth.signOut();
        this.authChange.next(false);
        this.router.navigate(['/']);
        this.isAuthenticated = false;
    }

    isAuth(){
        return this.isAuthenticated;
    }

    private authSuccesfully(){
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/']);
    }

}
import { Component, OnDestroy, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'teacher-app';
  isAuth = false;
  authSubscription: Subscription; 

  constructor(private db:AngularFireDatabase, private authService:AuthService){  }
  
  ngOnInit(): void { 
    this.authSubscription = this.authService.authChange.subscribe(authStatus=>{
      this.isAuth = authStatus;
    });

  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Observable } from 'rxjs';
import {map, timeInterval} from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  control = true;
  homework = "";

  active_day = "";

  control_Mat = false;
  control_Tur = false;
  control_Hayat = false;
  control_Fen = false;

  control_Monday = false;
  control_Tuesday = false;
  control_Wednesday = false;
  control_Thursday = false;
  control_Friday = false;
  
  monday = [];
  tuesday = [];
  wednesday = [];
  thursday = [];
  friday = [];

  monday_hws = [];
  tuesday_hws = [];
  wednesday_hws = [];
  thursday_hws = [];
  friday_hws = [];

  day = 1;
  month=1;
  year= 2021;

  constructor(private db:AngularFireDatabase) { }

  ngOnInit(): void { 
    var dateObj = new Date();
    //dateObj.setDate(dateObj.getDate());
    this.day = dateObj.getDate();
    this.day = 21;
    this.month = dateObj.getMonth() + 1;
    this.year = dateObj.getFullYear();

    this.db.list('/dersprogrami/01Pazartesi').snapshotChanges().subscribe(items=>{
      this.monday = [];
      items.forEach(values => {
        this.monday.push(values.payload.val());
     });
    });

    this.db.list('/dersprogrami/02Sali').snapshotChanges().subscribe(items=>{
      this.tuesday = [];
      items.forEach(values => {
        this.tuesday.push(values.payload.val());
     });
    });

    this.db.list('/dersprogrami/03Carsamba').snapshotChanges().subscribe(items=>{
      this.wednesday = [];
      items.forEach(values => {
        this.wednesday.push(values.payload.val());
     });
    });

    this.db.list('/dersprogrami/04Perşembe').snapshotChanges().subscribe(items=>{
      this.thursday = [];
      items.forEach(values => {
        this.thursday.push(values.payload.val());
     });
    });

    this.db.list('/dersprogrami/05Cuma').snapshotChanges().subscribe(items=>{
      this.friday = [];
      items.forEach(values => {
        this.friday.push(values.payload.val());
     });
    });

    //-----
    this.db.list('/homeworks/hwMonday').snapshotChanges().subscribe(items=>{
      this.monday_hws = [];
      items.forEach(values => {
        var finish = values.payload.child("Finish").val().split(".", 3);
        var day_1 = finish[0];
        var month_1 = finish[1];
        var year_1 = finish[2];
        if(year_1>=this.year && month_1>=this.month && day_1>=this.day){
          this.monday_hws.push(values.payload.val());
        }
        
     });
    });

    this.db.list('/homeworks/hwTuesday').snapshotChanges().subscribe(items=>{
      this.tuesday_hws = [];
      items.forEach(values => {
        var finish = values.payload.child("Finish").val().split(".", 3);
        var day_1 = finish[0];
        var month_1 = finish[1];
        var year_1 = finish[2];

        if(year_1>=this.year && month_1>=this.month && day_1>=this.day){
          this.tuesday_hws.push(values.payload.val());
        }
        
     });
    });

    this.db.list('/homeworks/hwWednesday').snapshotChanges().subscribe(items=>{
      this.wednesday_hws = [];
      items.forEach(values => {
        var finish = values.payload.child("Finish").val().split(".", 3);
        var day_1 = finish[0];
        var month_1 = finish[1];
        var year_1 = finish[2];

        /*console.log(day_1);
        console.log(month_1);
        console.log(year_1);*/
        if(year_1>=this.year && month_1>=this.month && day_1>=this.day){
          this.wednesday_hws.push(values.payload.val());
        }      
     });
    });

    this.db.list('/homeworks/hwThursday').snapshotChanges().subscribe(items=>{
      this.thursday_hws = [];
      items.forEach(values => {
        var finish = values.payload.child("Finish").val().split(".", 3);
        var day_1 = finish[0];
        var month_1 = finish[1];
        var year_1 = finish[2];
        if(year_1>=this.year && month_1>=this.month && day_1>=this.day){
          this.thursday_hws.push(values.payload.val());
        }
        
     });
    });

    this.db.list('/homeworks/hwFriday').snapshotChanges().subscribe(items=>{
      this.friday_hws = [];
      items.forEach(values => {
        var finish = values.payload.child("Finish").val().split(".", 3);
        var day_1 = finish[0];
        var month_1 = finish[1];
        var year_1 = finish[2];
        if(year_1>=this.year && month_1>=this.month && day_1>=this.day){
          this.friday_hws.push(values.payload.val());
        }
      
     });
    });

    //----

    var dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + 1); // +3
    var weekday = dateObj.toLocaleString("default", { weekday: "long" });

    if(weekday=="Pazartesi"){
      weekday = "Monday";
    }else if(weekday=="Salı"){
      weekday = "Tuesday";
    }else if(weekday=="Çarşamba"){
      weekday = "Wednesday";
    }else if(weekday=="Perşembe"){
      weekday = "Thursday";
    }else if(weekday=="Cuma"){
      weekday = "Friday";
    }

    this.active_day = String(weekday);

    if(weekday=="Monday"){
      this.control_Monday = true;
    }else if(weekday=="Tuesday"){
      this.control_Tuesday = true;
    }else if(weekday=="Wednesday"){
      this.control_Wednesday = true;
    }else if(weekday=="Thursday"){
      this.control_Thursday = true;
    }else if(weekday=="Friday"){
      this.control_Friday = true;
    }
    console.log(weekday);
    console.log(this.control_Monday);

    this.db.database.ref("/hw"+weekday).once("value").then((snapshot)=>{
      this.homework =  snapshot.val();
      var turkce = /Türkçe/gi;
      var matematik = /Matematik/gi;
      var fen = /Fen/gi;
      var hayat = /Hayat/gi;
      var homework_string = String(this.homework);

      if(homework_string.search(turkce)!=-1){
         this.control_Tur = true;
      }
      if(homework_string.search(matematik)!=-1){
        this.control_Mat = true;
      }
     if(homework_string.search(fen)!=-1){
      this.control_Fen = true;
      }
      if(homework_string.search(hayat)!=-1){
      this.control_Hayat = true;
      }
      /*console.log(this.homework);
      console.log(this.control_Mat);
      console.log(this.control_Monday);*/

    });
  }
}

import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concat, Observable } from 'rxjs';
import {map, timeInterval} from 'rxjs/operators';

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.component.html',
  styleUrls: ['./homeworks.component.css']
})
export class HomeworksComponent implements OnInit {

  enable = false;
  hwForm: FormGroup;
  monday = [];
  tuesday = [];
  wednesday = [];
  thursday = [];
  friday = [];

  todays_hws = "";
  day = "";

  constructor(private db:AngularFireDatabase,private router:Router) { }

  ngOnInit(): void {
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

    if(weekday=="Cumartesi" || weekday=="Pazar" || weekday=="Satuday" || weekday=="Sunday"){
        weekday = "Monday";
    }
    
    //--- for html day
    this.day = weekday;
    if(this.day=="Monday"){
      this.day = "Pazartesi";
    }else if(weekday=="Tuesday"){
      this.day = "Salı";
    }else if(weekday=="Wednesday"){
      this.day = "Çarşamba";
    }else if(weekday=="Thursday"){
      this.day = "Perşembe";
    }else if(weekday=="Friday"){
      this.day = "Cuma";
    }
    //----
    this.db.database.ref("/hw"+weekday).once("value").then((snapshot)=>{
      var homework = snapshot.val();
      this.todays_hws = String(homework);  
    });

    /*this.db.list('/homeworks/01Pazartesi').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
        this.monday.push(values.payload.val());
     });
    });

    this.db.list('/homeworks/02Sali').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
        this.tuesday.push(values.payload.val());
     });
    });

    this.db.list('/homeworks/03Carsamba').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
        this.wednesday.push(values.payload.val());
     });
    });

    this.db.list('/homeworks/04Perşembe').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
        this.thursday.push(values.payload.val());
     });
    });

    this.db.list('/homeworks/05Cuma').snapshotChanges().subscribe(items=>{
      items.forEach(values => {
        this.friday.push(values.payload.val());
     });
    });*/

    this.hwForm = new FormGroup({
      lesson: new FormControl('', { validators: [Validators.required]}),
      startingPage: new FormControl('', { validators: [Validators.required] }),
      EndPage: new FormControl('', { validators: [Validators.required] }),
      flexCheckDefault: new FormControl('', { validators: [Validators.required] })
    });

    this.hwForm.controls['lesson'].setValue("--Lütfen Ders Seçiniz--", {onlySelf: true});
  }

  onSubmit(form){
    if (form.lesson == "--Lütfen Ders Seçiniz--"){
      window.alert("Lütfen bir ders seçiniz!");
    }else if(form.EndPage==0 || form.EndPage==null || form.startingPage==0 || form.startingPage==null){
      window.alert("Lütfen sayfa aralıklarını doldurduğunuzdan emin olunuz!");
    }else if(form.EndPage<form.startingPage){
      window.alert("Bitiş sayfa numarası başlangıç sayfa numarasından küçük olamaz!");
    }else{
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

      if(weekday=="Cumartesi" || weekday=="Pazar" || weekday=="Satuday" || weekday=="Sunday"){
        weekday = "Monday";
    }

      //console.log(weekday);

      console.log(form.flexCheckDefault);
      var day = dateObj.getDay();
      day = 22;
      var month = dateObj.getMonth() + 1;
      var year = dateObj.getFullYear();

      this.db.database.ref("/hw"+weekday).once("value").then((snapshot)=>{
        var homework = snapshot.val();
        /*console.log(homework+ "; " +
        form.lesson + ", Sayfa Aralığı: " + form.startingPage + "-" + form.EndPage);*/
        if(form.flexCheckDefault){
          this.db.database.ref("/hw"+weekday).set(form.lesson + ", Sayfa Aralığı: " + form.startingPage + "-" + form.EndPage);
          this.db.database.ref("/homeworks/hw"+weekday+'/').remove();
          this.db.database.ref("/homeworks/hw"+weekday).push({
            Book: form.lesson,
            Finish: day + "." + month + "." + year,
            Pages : form.startingPage + "-"+ form.EndPage
          }).key;

          window.alert("Tebrikler! "+ form.lesson + ", Sayfa Aralığı: " + form.startingPage + "-" + form.EndPage + " olan ödevi eklediniz!");
          this.router.navigate(['/']);
        }else{
          this.db.database.ref("/hw"+weekday).set(homework+ "; " +
          form.lesson + ", Sayfa Aralığı: " + form.startingPage + "-" + form.EndPage);
          window.alert("Tebrikler! "+ form.lesson + ", Sayfa Aralığı: " + form.startingPage + "-" + form.EndPage + " olan ödevi eklediniz!");
          this.router.navigate(['/']);
          this.db.database.ref("/homeworks/hw"+weekday).push({
            Book: form.lesson,
            Finish: day + "." + month + "." + year,
            Pages : form.startingPage + "-"+ form.EndPage
          }).key;
        }
      });
    }
    
  }

}

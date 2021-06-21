import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DialogComponent } from './dialog/dialog.component';
import { HomeworksComponent } from './homeworks/homeworks.component';
import { SurveyComponent } from './survey/survey.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {path:'', component: WelcomeComponent},
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'homeworks', component:HomeworksComponent, canActivate: [AuthGuard]},
  {path:'dialog', component:DialogComponent},
  {path:'survey', component:SurveyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }

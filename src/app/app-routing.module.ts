import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VideoCallComponent } from './pages/video-call/video-call.component';
import { LoginComponent } from './pages/login/login.component';
import { CallDashboardComponent } from './pages/call-dashboard/call-dashboard.component';
import { AuthGuard } from './auth-guard/auth.guard';

const routes: Routes = [
  { path : "", component : LoginComponent },
  { path : "video/:toID",canActivate: [AuthGuard], component : VideoCallComponent },
  { path : "call-dashboard", canActivate: [AuthGuard],  component : CallDashboardComponent },
  { path : 'chat', canActivate: [AuthGuard],  component : HomeComponent },
  { path : '**', component : LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

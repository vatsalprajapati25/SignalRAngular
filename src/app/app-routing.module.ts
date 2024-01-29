import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VideoCallComponent } from './pages/video-call/video-call.component';

const routes: Routes = [
  { path : "", component : VideoCallComponent },
  { path : 'home', component : HomeComponent },
  { path : '**', component : VideoCallComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

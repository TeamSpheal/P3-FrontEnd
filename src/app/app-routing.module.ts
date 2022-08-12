import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/user-search/user-search.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component'

const routes: Routes = [
  //{ path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "", redirectTo: "/post-feed", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "post-feed", component: PostFeedPageComponent},
  { path: "search", component: SearchComponent},
  { path: "post-feed", component: PostFeedPageComponent },
  { path: "user-settings", component: UserSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
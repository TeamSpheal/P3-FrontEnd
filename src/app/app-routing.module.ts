import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/user-search/user-search.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component'
import { ResetPwComponent } from './components/reset-pw/reset-pw.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
    //{ path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "", redirectTo: "/post-feed", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "post-feed", component: PostFeedPageComponent },
    { path: "search", component: SearchComponent },
    { path: "user-settings", component: UserSettingsComponent },
    { path: "reset-pw", component: ResetPwComponent },
    { path: "user-profile/:id", component: UserProfileComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
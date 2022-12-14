import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { UserInitialsPipe } from './pipes/user-initials.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FollowComponent } from './components/follow/follow.component';
import { ResetPwComponent } from './components/reset-pw/reset-pw.component';
import { SearchComponent } from './components/user-search/user-search.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        PostFeedPageComponent,
        PostComponent,
        CommentComponent,
        NavbarComponent,
        UserInitialsPipe,
        SearchComponent,
        UserSettingsComponent,
        ResetPwComponent,
        UserProfileComponent,
        FollowComponent,
        ImageUploadComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        MatProgressBarModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service'; 
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
  followerId!: number;
  followedId!: number; 
  isFollow: boolean = false;
  @Input() authorId!: number; 
  @Input() color!: string; 
  @Input() text: string = 'Follow';



  constructor(private authService: AuthService, private postService: PostService, private userService: UserService) { }

  ngOnInit(): void {
    this.default()
  }

  
  addFollower() {
    this.followedId = this.authorId; 
    this.followerId = this.authService.currentUser.id;
    this.userService.addFollower(this.followedId, this.followerId).subscribe((resp) => {
      console.log(resp)
    })
  }

  changeBtn() {
    this.text = "unfollow"; 
    let btn: HTMLButtonElement = document.getElementById("follow") as HTMLButtonElement; 
    btn.innerText = this.text; 
    btn.style.backgroundColor = "gray"; 
  }

  toggleButton() {
    if (!this.isFollow) {
      this.addFollower();
      this.changeBtn(); 
    } else {
      this.default();
      this.removeFollower();
      
    }
    
  }
  removeFollower() {
    throw new Error('Method not implemented.');
  }



  // called on load
  default() {
    let btn: HTMLButtonElement = document.getElementById("follow") as HTMLButtonElement; 
    btn.innerText = this.text; 
    btn.style.backgroundColor = "pink"; 
  }





}




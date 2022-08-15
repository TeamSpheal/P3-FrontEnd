import { Component, Input, OnInit } from '@angular/core';
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
  @Input() authorId!: number; 


  constructor(private authService: AuthService, private postService: PostService, private userService: UserService) { }

  ngOnInit(): void {
  }

  addFollower() {
     // dummy data. Need to get post uer id
    this.followedId = this.authorId; 
    this.followerId = this.authService.currentUser.id;
    this.userService.addFollower(this.followedId, this.followerId).subscribe((resp) => {
      console.log(resp)
    })

    

  }

}

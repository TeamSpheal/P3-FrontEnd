import { Component, OnInit } from '@angular/core';
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


  constructor(private authService: AuthService, private postService: PostService, private userService: UserService) { }

  ngOnInit(): void {
  }

  addFollower() {
     // dummy data. Need to get post uer id
    this.followedId = 1; 
    this.followerId = this.authService.currentUser.id;
    this.userService.addFollower(this.followedId, this.followerId).subscribe((resp) => {
      console.log(resp)
    })

    

  }

}

import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import UserMiniDTO from '../../models/UserMiniDTO';
import User from '../../models/User';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
    selector: 'app-follow',
    templateUrl: './follow.component.html',
    styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
/*Class Variables*/
    loggedIn: User;
    loggedInId!: number;
    isFollow: boolean = false;
    viewingUser!: UserMiniDTO;
    followBtn: HTMLButtonElement;
    followingList: UserMiniDTO[];
    @Input() viewingId: number;
    @Input() color!: string;
    @Input() text: string = 'Follow';

    /**
     * A constructor to provide dependencies for the class
     * @param userService
     * @param userProfComp
     */
    constructor(private userProfComp: UserProfileComponent, private userService: UserService) { }

    /**Upon initialization, retrieves viewingUser from local storage 
     * and determines whether that user is being followed by the logged in user
     */
    ngOnInit(): void {
        this.viewingUser = JSON.parse(<string>localStorage.getItem("viewingUser"));
        this.loggedIn = JSON.parse(<string>localStorage.getItem("user"));
        this.loggedInId = this.loggedIn.id;
        this.isFollow = this.userService.isFollowing(this.viewingUser);
        this.followBtn = <HTMLButtonElement>document.getElementById("follow");
        this.followingList = this.loggedIn.following;

        //change button to match isFollow
        this.changeBtn();
    }

    /**
     * Changes the following state based on whether the logged in user 
     * is or not already following the viewed user
     * @param event
     */
    changeFollowState(event: any) {
        event.preventDefault();
        if (this.isFollow) {
            this.removeFromFollowing();
        } else {
            this.addToFollowing();
        }
    }

    /**Adds the viewed user to the logged in user's list of followings
     * and changes the following state if the operation is successful
     */
    addToFollowing() {
        let response: any | undefined;
        this.userService.addFollower(this.loggedInId, this.viewingId).subscribe((data: any) => {
            console.log("addFollowResp: " + data);
            //Parse data
            if (data != undefined) {
                response = JSON.parse(JSON.stringify(data));
            }

            //Process data
            if (response != undefined) { //Data is defined. The return from the response should contain a user object
                this.isFollow = !this.isFollow;
                this.changeBtn();
                this.followingList.push(this.viewingUser);
                this.loggedIn.following = this.followingList;
                localStorage.setItem("user", JSON.stringify(this.loggedIn));
                this.userProfComp.followerCount += 1;
                alert(
                    "You haved successfully followed this user!"
                );
            } else { //Data is undefined, meaning the request failed
                alert(
                    "The server failed to follow this user"
                );
            }
        });
    }

    /**Removes the viewed user from the logged in user's list of followings
     * and changes the following state if the operation is successful
     */
    removeFromFollowing() {
        let response: any | undefined;
        this.userService.removeFollower(this.loggedInId, this.viewingId).subscribe((data: any) => {
            //Parse data
            if (data != undefined) {
                response = JSON.parse(JSON.stringify(data));
            }

            //Process data
            if (response != undefined) { //Data is defined. The return from the response should contain a user object
                let removeIdx: number;
                this.isFollow = !this.isFollow;
                removeIdx = this.followingList.findIndex((element) => element.id = this.viewingId)
                this.followingList.splice(removeIdx);
                this.loggedIn.following = this.followingList;
                localStorage.setItem("user", JSON.stringify(this.loggedIn));
                this.userProfComp.followerCount -= 1;

                this.changeBtn();
                alert(
                    "You haved successfully unfollowed this user!"
                );
            } else { //Data is undefined, meaning the request failed
                alert(
                    "The server failed to unfollow this user"
                );
            }
        })
    }

    /**Changes the styling of followBtn based on the following state
     */
    changeBtn() {
        if (this.isFollow) {
            this.text = "unfollow";
            this.followBtn.style.setProperty("innerText", this.text);
            this.followBtn.style.setProperty ("backgroundColor", "#FCB414DF");
        } else {
            this.text = 'follow';
            this.followBtn.style.setProperty("background-color", "white");
            this.followBtn.style.setProperty('text', this.text);
        }
    }
}




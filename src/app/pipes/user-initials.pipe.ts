import { Pipe, PipeTransform } from "@angular/core";
import User from "../models/User";

@Pipe({name: 'userInitials'})
export class UserInitialsPipe implements PipeTransform {
    transform(value: User): string {
        if (value) {
            return (value.firstName.charAt(0) + value.lastName.charAt(0)).toUpperCase();
        } else {
            return ""
        }
    }
}
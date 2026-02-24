
import { UserName } from "./value-objects/UserName";
import { Email } from "./value-objects/Email";
import { Password } from "./value-objects/Password";
import { AggregateRoot } from "@/modules/shared/domain/aggregate-root";
import { randomUUID } from "crypto";

export interface UserProps {
    familyId: string
    name: UserName
    email: Email
    password: Password
    createdAt?: Date
    updatedAt?: Date
}

export class User extends AggregateRoot<UserProps, string> {

    private constructor(props:UserProps){
        super(randomUUID(), props)
    }


    updateName(newName: UserName) {
        this.props.name = newName;
        this.touch();
    }

    updateEmail(newEmail: Email) {
        this.props.email = newEmail;
        this.touch();
    }

    updatePassword(newPassword: Password) {
        this.props.password = newPassword;
        this.touch();
    }
}
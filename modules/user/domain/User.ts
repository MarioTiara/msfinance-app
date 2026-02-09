import { FamilyId } from "@/modules/familiy/domain/value-objects/FamilyId";
import { UserId } from "./value-objects/UserId";
import { UserName } from "./value-objects/UserName";
import { Email } from "./value-objects/Email";
import { Password } from "./value-objects/Password";

export class User {
    constructor(
        public readonly id: UserId,
        public familyId: FamilyId,
        public name: UserName,
        public email: Email,
        public password: Password,
        public readonly createdAt: Date = new Date(),
        public  updatedAt: Date = new Date()
    ) { }

    updateName(newName: UserName) {
        this.name = newName;
        this.touch();
    }

    updateEmail(newEmail: Email) {
        this.email = newEmail;
        this.touch();
    }

    updatePassword(newPassword: Password) {
        this.password = newPassword;
        this.touch();
    }

    changeFamily(newFamilyId: FamilyId) {
        this.familyId = newFamilyId;
        this.touch();
    }

    private touch() {
        this.updatedAt = new Date();
    }
}
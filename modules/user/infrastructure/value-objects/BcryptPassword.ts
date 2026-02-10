import bcrypt from "bcryptjs";
import { Password } from "../../domain/value-objects/Password";


export class BcryptPassword implements Password {
  private constructor(public readonly value: string) {}

  /** Factory: hash a plain text password */
  static async create(plain: string): Promise<BcryptPassword> {
    if (!plain || plain.trim().length === 0) {
      throw new Error("Password cannot be empty");
    }
    if (plain.length > 255) {
      throw new Error("Password cannot exceed 255 characters");
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(plain, saltRounds);
    return new BcryptPassword(hash);
  }

  /** Validate plain text password against hash */
  async validate(plain: string): Promise<boolean> {
    return bcrypt.compare(plain, this.value);
  }

  /** Optional: domain-level password strength check */
  checkStrength?(plain: string): void {
    if (plain.length < 8) throw new Error("Password too short, min 8 chars");
    if (!/[A-Z]/.test(plain)) throw new Error("Password must have uppercase letter");
    if (!/[0-9]/.test(plain)) throw new Error("Password must have number");
  }
}

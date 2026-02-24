export class Email {
  private static MAX_LENGTH = 150;
  constructor(public readonly value: string) {
    if (!value.includes("@")) throw new Error("Invalid email");
    if (value.length > Email.MAX_LENGTH) throw new Error(`Email cannot exceed ${Email.MAX_LENGTH} characters`);
  }
}

export class UserName {
  private static MAX_LENGTH = 100;
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) throw new Error("Name cannot be empty");
    if (value.length > UserName.MAX_LENGTH) throw new Error(`Name cannot exceed ${UserName.MAX_LENGTH} characters`);
  }
}

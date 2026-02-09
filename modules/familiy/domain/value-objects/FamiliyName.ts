export class FamilyName {
  private static MAX_LENGTH = 100;
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) throw new Error("Family name cannot be empty");
    if (value.length > FamilyName.MAX_LENGTH) throw new Error(`Family name cannot exceed ${FamilyName.MAX_LENGTH} characters`);
  }
}

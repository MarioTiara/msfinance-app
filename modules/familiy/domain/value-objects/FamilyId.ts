export class FamilyId {
  private static MAX_LENGTH = 50; // kalau ingin string id
  constructor(public readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("FamilyId cannot be empty");
    }
    if (value.length > FamilyId.MAX_LENGTH) {
      throw new Error(`FamilyId cannot exceed ${FamilyId.MAX_LENGTH} characters`);
    }
  }
}

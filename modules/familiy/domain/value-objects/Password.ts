export interface Password {
    value:string
    validate(plain:string): Promise<boolean>;
    checkStrength?(plain: string): void;
}
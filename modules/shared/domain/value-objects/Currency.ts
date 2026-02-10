export class Currency {
    private constructor(private readonly code: string) { }

    public static USD = new Currency('USD')
    public static EUR = new Currency('EUR')
    public static IDR = new Currency('IDR')
    public static AUD = new Currency('AUD')
    public static SGD = new Currency('SGD')

    public static from(code: string): Currency {
        const normalized = code.toUpperCase()
        const allowed = ['USD', 'EUR', 'IDR','AUD','SGD']

        if (!allowed.includes(normalized)) {
            throw new Error(`Unsupported currency: ${code}`)
        }
        return new Currency(normalized)
    }

    public equals(other: Currency): boolean {
        return this.code === other.code
    }

    public get value(): string {
        return this.code
    }
}
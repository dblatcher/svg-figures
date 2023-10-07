class IdGen{
    used:number[];

    constructor() {
        this.used = []
    }

    generate(seed = 'id'):string {
        const nextNumber = this.used.length
        this.used.push(nextNumber)
        return `${seed}-${nextNumber}`
    }
}

export const uniqueId = new IdGen();

export const getMaskId = (ident:string) => `${ident}-mask`
export const getMaskUrl = (ident:string) => `url(#${ident}-mask)`

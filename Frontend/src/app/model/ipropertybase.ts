export interface IPropertyBase {
    id: number;
    sellRent: number;
    name: string;
    propertyType: string;
    furnishingType: string;
    price: number;
    bhk: number;
    builtArea: number;
    city: string;
    readyToMove: number;
    image?: string;
    estPossessionOn?: Date;
}

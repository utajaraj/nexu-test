export interface Car {
    model: string,
    average_price: number,
    brand_name?:string,
    data_id?:number,
    brand_id:number
}
export interface Brand {
    name: string,
}
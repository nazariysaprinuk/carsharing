export interface Car {
    id: string;
    name: string;
    model: string;
    date: number;
    type: string;
    numb_seats: number;
    engine: {
        fuel_type: string;
        transmission: string;
        cubic_capacity: number;
    }
    price: number;
    image: string;
    location: string;
    ext_color: string;
    orders: number;
    /* description: string; */
}

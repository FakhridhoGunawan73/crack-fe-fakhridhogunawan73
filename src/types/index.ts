export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface Kos {
    id: string;
    name: string;
    city: string;
}

export interface Room {
    id: number;
    roomNumber: string;
    price: number;
}

export interface Booking {
    id: number;
    status: string;
}
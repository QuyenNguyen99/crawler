export interface CustomerInfo{
    name: string;
    dob: string;
    amoutOfAge: {
        min: number,
        max: number,
    };
    gender: string,
    marriage: string,
    telephoneNumber: string,
    email: string,
}
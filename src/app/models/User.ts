/** User object */
export interface User{
    id: number;
    name: string;
    email: string;
    password: string;
    /**
     * States if user has been authorized to access through the login page of the application 
     * takes 0 or 1 as a value representing true or false for the SQL table 
     * */
    accepted: number;
    /** 
     * States if user has admin role
     * takes 0 or 1 as a value representing true or false for the SQL table 
     * */
    admin: number;
}
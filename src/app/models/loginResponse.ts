import { User } from "./User";

/** lHTTP response object from login request */
export interface loginResponse{
    /** the User object returned inside the login respons */
    user: User;
}
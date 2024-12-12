export interface User {

    id_user?: string;
    name: string;
    email: string;
    password_hash: string;
    created_at: string;
    updated_at?: string;
    active?: boolean;

}

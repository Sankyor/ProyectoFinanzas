export interface Transaction {
    id_transaction?: string;
    id_user: string;
    id_account: string;
    id_category: string;
    amount: number;
    type: number;
    transaction_date: string;
    transaction_type: number;
    description?: string;
    created_at: string;
    updated_at?: string;

}

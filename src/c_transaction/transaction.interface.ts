export interface iTransaction {
    id_transaction?: string;
    id_user: string;
    id_account: string;
    id_category: string;
    amount: number;
    id_transaction_type: string;
    transaction_date: string;
    description?: string;
    created_at: string;
    updated_at?: string;

}


import { TransactionType } from "./schema2";
export const insertTransactionType = async () => {
    const search = await TransactionType.count();
    if (search === 0) {
        const transactionTypes = [
            { name: 'Income', description: 'Ingreso recibido, como salario o inversión.' },
            { name: 'Expense', description: 'Gasto realizado, como compras o facturas.' },
            { name: 'Transfer', description: 'Transferencia de dinero entre cuentas.' },
            { name: 'Refund', description: 'Reembolso de dinero recibido.' },
            { name: 'Payment', description: 'Pago realizado, como cuotas o servicios.' }
        ];
        try {
            for (const transactionType of transactionTypes) {
                const [instance, created] = await TransactionType.findOrCreate({
                    where: { name: transactionType.name },
                    defaults: transactionType,
                });

                if (created) {
                    console.log(`AccountType '${transactionType.name}' created.`);
                } else {
                    console.log(`AccountType '${transactionType.name}' already exists.`);
                }
            }
        } catch (error) {
            console.error("Error inserting AccountType:", error);
        }
    }
};

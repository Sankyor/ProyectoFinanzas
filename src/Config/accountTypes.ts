import { AccountType } from "./schema2";
export const insertAccountType = async () => {
    const search = await AccountType.count();
    if (search === 0) {
        const accountTypes = [
            { name: 'Bank Account', description: 'Cuenta bancaria utilizada para depósitos y retiros.' },
            { name: 'Credit Card', description: 'Tarjeta de crédito utilizada para compras y pagos.' },
            { name: 'Savings Account', description: 'Cuenta de ahorros para guardar dinero a largo plazo.' },
            { name: 'Wallet', description: 'Bolsillo digital o físico para gastos menores.' },
        ];

        try {
            for (const accountType of accountTypes) {
                const [instance, created] = await AccountType.findOrCreate({
                    where: { name: accountType.name },
                    defaults: accountType,
                });

                if (created) {
                    console.log(`AccountType '${accountType.name}' created.`);
                } else {
                    console.log(`AccountType '${accountType.name}' already exists.`);
                }
            }
        } catch (error) {
            console.error("Error inserting AccountType:", error);
        }
    }
};



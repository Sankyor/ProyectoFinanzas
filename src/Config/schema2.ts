import { Table, Column, Model, PrimaryKey, Default, DataType, ForeignKey, BelongsTo, Unique } from 'sequelize-typescript';

@Table //({ tableName: 'account_type', timestamps: false })
export class AccountType extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id_account_type!: string;

    @Unique
    @Column({ type: DataType.STRING(50), allowNull: false })
    name!: string;

    @Column(DataType.TEXT)
    description?: string;
}

@Table//({ tableName: 'transaction_type', timestamps: false })
export class TransactionType extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id_transaction_type!: string;

    @Unique
    @Column({ type: DataType.STRING(50), allowNull: false })
    name!: string;

    @Column(DataType.TEXT)
    description?: string;
}

interface iUser {
    id_user?: string;
    name: string;
    email: string;
    password_hash: string;
    active: boolean;
}

@Table//({ tableName: 'user', timestamps: false })
export class User extends Model<iUser> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id_user!: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    name!: string;

    @Unique
    @Column({ type: DataType.STRING(150), allowNull: false })
    email!: string;

    @Column({ type: DataType.STRING(255), allowNull: false })
    password_hash!: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    active!: boolean;
}

@Table//({ tableName: 'account', timestamps: false })
export class Account extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id_account!: string;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    id_user!: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    name!: string;

    @ForeignKey(() => AccountType)
    @Column(DataType.UUID)
    id_account_type!: string;

    @Column({ type: DataType.DECIMAL(18, 2), defaultValue: 0 })
    balance!: number;

    @Column(DataType.DECIMAL(18, 2))
    credit_limit?: number;

    @Column(DataType.DATE)
    due_date?: Date;

    @BelongsTo(() => User)
    user?: User;

    @BelongsTo(() => AccountType)
    accountType?: AccountType;
}
@Table//({ tableName: 'transaction', timestamps: false })
export class Transaction extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id_transaction!: string;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    id_user!: string;

    @ForeignKey(() => Account)
    @Column(DataType.UUID)
    id_account!: string;

    @Column({ type: DataType.DECIMAL(18, 2), allowNull: false })
    amount!: number;

    @ForeignKey(() => TransactionType)
    @Column(DataType.UUID)
    id_transaction_type!: string;

    @Column(DataType.TEXT)
    description?: string;

    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    transaction_date!: Date;

    @BelongsTo(() => User)
    user?: User;

    @BelongsTo(() => Account)
    account?: Account;

    @BelongsTo(() => TransactionType)
    transactionType?: TransactionType;
}



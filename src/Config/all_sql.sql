DROP DATABASE IF EXISTS BudgetZero;

CREATE DATABASE BudgetZero;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS Accounts;

DROP TABLE IF EXISTS Categories;

DROP TABLE IF EXISTS Transactions;

DROP TABLE IF EXISTS Parameters;

-- Tabla de Usuarios
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id_user UUID PRIMARY KEY DEFAULT uuid_generate_v4 (), -- UUID generado con nanoid
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Categorías (ingresos, egresos, etc.)
CREATE TABLE categories (
    id_category UUID PRIMARY KEY DEFAULT uuid_generate_v4 (), -- UUID generado con nanoid
    name VARCHAR(100) NOT NULL UNIQUE, -- Ejemplo: "Food", "Salary"
    type VARCHAR(50) NOT NULL, -- 'income' o 'expense'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Cuentas Bancarias o Bolsillos
CREATE TABLE accounts (
    id_account UUID PRIMARY KEY DEFAULT uuid_generate_v4 (), -- UUID generado con nanoid
    id_user UUID NOT NULL, -- Relación con el usuario
    name VARCHAR(100) NOT NULL, -- Ejemplo: "Main Account", "Credit Card"
    type VARCHAR(50) NOT NULL, -- 'bank', 'wallet', 'credit_card', etc.
    balance DECIMAL(18, 2) DEFAULT 0, -- Saldo actual de la cuenta
    credit_limit DECIMAL(18, 2), -- Límite de crédito (si aplica)
    due_date DATE, -- Fecha de pago de la tarjeta (si aplica)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE
);

-- Tabla de Movimientos
CREATE TABLE transactions (
    id_transaction UUID PRIMARY KEY DEFAULT uuid_generate_v4 (), -- UUID generado con nanoid
    id_user UUID NOT NULL, -- Relación con el usuario
    id_account UUID NOT NULL, -- Relación con la cuenta
    id_category UUID NOT NULL, -- Relación con la categoría
    amount DECIMAL(18, 2) NOT NULL, -- Monto de la transacción
    type NUMERIC(2) NOT NULL, -- 'income' o 'expense'
    description TEXT, -- Detalle opcional
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha del movimiento
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE,
    FOREIGN KEY (id_account) REFERENCES accounts (id_account) ON DELETE CASCADE,
    FOREIGN KEY (id_category) REFERENCES categories (id_category) ON DELETE SET NULL
);

-- Table: Parameters (for configurable options like currency)
CREATE TABLE Parameters (
    parameter_id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    id_user UUID REFERENCES Users (id_user) ON DELETE CASCADE,
    parameter_name VARCHAR(50) NOT NULL,
    parameter_value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Presupuestos
-- CREATE TABLE budgets (
--     id_budget UUID PRIMARY KEY DEFAULT uuid_generate_v4 (), -- UUID generado con nanoid
--     id_user UUID NOT NULL,      -- Relación con el usuario
--     name VARCHAR(100) NOT NULL,        -- Ejemplo: "Monthly Budget"
--     total_amount DECIMAL(18, 2) NOT NULL, -- Cantidad asignada al presupuesto
--     start_date DATE NOT NULL,          -- Fecha de inicio del presupuesto
--     end_date DATE NOT NULL,            -- Fecha de finalización del presupuesto
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (id_user) REFERENCES users (id_user) ON DELETE CASCADE
-- );

-- -- Tabla de Asignaciones de Presupuesto
-- CREATE TABLE budget_allocations (
--     id_allocation UUID PRIMARY KEY DEFAULT uuid_generate_v4 (), -- UUID generado con nanoid
--     id_budget UUID NOT NULL,        -- Relación con el presupuesto
--     id_category UUID NOT NULL,      -- Relación con la categoría
--     allocated_amount DECIMAL(18, 2) NOT NULL, -- Cantidad asignada a la categoría
--     FOREIGN KEY (id_budget) REFERENCES budgets (id_budget) ON DELETE CASCADE,
--     FOREIGN KEY (id_category) REFERENCES categories (id_category) ON DELETE CASCADE
-- );
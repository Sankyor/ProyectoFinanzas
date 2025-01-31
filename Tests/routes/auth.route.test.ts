import { describe, it, expect, vi } from "vitest";
import { Response, Request } from "express";

// Controladores simulados (funciones dummy)
const login = (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (email === "test@example.com" && password === "password123") {
        res.status(200).json({ message: "Login successful" });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
};

const register = (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Missing required fields" });
    } else {
        res.status(201).json({ message: "User registered successfully" });
    }
};

// Mock de Request y Response
const mockRequest = (body: Response) => ({ body });
const mockResponse = () => {
    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
    };
    return res;
};

describe("AuthController Tests", () => {
    describe("Login", () => {
        it("should return success message for valid credentials", () => {
            const req = mockRequest({ email: "test@example.com", password: "password123" });
            const res = mockResponse();

            login(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Login successful" });
        });

        it("should return error for invalid credentials", () => {
            const req = mockRequest({ email: "test@example.com", password: "wrongpassword" });
            const res = mockResponse();

            login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: "Invalid credentials" });
        });
    });

    describe("Register", () => {
        it("should return success message for valid registration", () => {
            const req = mockRequest({ email: "newuser@example.com", password: "password123" });
            const res = mockResponse();

            register(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "User registered successfully" });
        });

        it("should return error for missing fields", () => {
            const req = mockRequest({ email: "incomplete@example.com" }); // Falta password
            const res = mockResponse();

            register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
        });
    });
});

export { }; // This makes the file an external module

declare global {
    namespace Express {
        interface Request {
            user?: {
                id_user: string;
            };
        }
    }
}
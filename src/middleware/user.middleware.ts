import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { UserValidator } from "../validations/user.validation";
import jwt from 'jsonwebtoken';
import { config } from "../config";

export default class UserMiddleware {

    // Middleware para validar el registro de usuario
    static async validateRegister(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { valid, errors } = UserValidator.validateRegister(req.body);
            if (!valid) {
                res.status(400).json({ success: false, errors });
                return; // Asegúrate de salir de la función después de enviar la respuesta
            }
            if (req.body.password.trim() !== req.body.confirmPassword.trim()) {
                res.status(400).json({ success: false, error: "Las contraseñas no coinciden" });
                return;
            }

            // Limpiar los datos
            req.body.email = req.body.email.trim();
            req.body.name = req.body.name.trim();
            req.body.password = req.body.password.trim();
            next();

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    errors: error.errors.map(err => ({
                        path: err.path[0] || 'unknown',
                        message: err.message
                    }))
                });
            } else {
                res.status(500).json({ error: 'An unexpected error occurred.' });
            }
        }
    }

    // Middleware para validar el login
    static validateLogin(req: Request, res: Response, next: NextFunction): void {
        try {
            const { valid, errors } = UserValidator.validateLogin(req.body);
            if (!valid) {
                res.status(400).json({ success: false, errors });
                return;
            }
            req.body.email = req.body.email.trim();
            req.body.password = req.body.password.trim();
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    errors: error.errors.map(err => ({
                        path: err.path[0] || 'unknown',
                        message: err.message
                    }))
                });
            } else {
                res.status(500).json({ error: 'An unexpected error occurred.' });
            }
        }
    }

    // Middleware para autenticar el token
    static authenticateToken(req: Request, res: Response, next: NextFunction): void {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

        if (token == null) {
            res.status(401).json({ error: "No token provided", authorized: false });
            return;
        }

        jwt.verify(token, config.jwtSecret, (err, user) => {
            if (err) {
                res.status(403).json({ error: 'Invalid token', authorized: false });
                return;
            }
            req.user = user; // Aquí asignamos el usuario decodificado
            next();
        });
    }

    // Middleware para cambiar la contraseña
    static async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { valid, errors } = UserValidator.validateChangePassword(req.body);
            if (!valid) {
                res.status(400).json({ success: false, errors });
                return;
            }
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    errors: error.errors.map(err => ({
                        path: err.path[0] || 'unknown',
                        message: err.message
                    }))
                });
            } else {
                res.status(500).json({ error: 'An unexpected error occurred.' });
            }
        }
    }
}

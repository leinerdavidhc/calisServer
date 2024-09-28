import "dotenv/config";

export const config = {
    port: process.env.PORT || 4000,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'root',
        database: process.env.DB_NAME || 'calis',
        dialect: process.env.DB_DIALECT || 'postgres',

    },
    email: process.env.EMAIL || 'leinerdavidhc20@gmail.com',
    passwordEmail: process.env.PASSWORD_EMAIL || '1234',
    jwtSecret: process.env.JWT_SECRET || 'secret',
}

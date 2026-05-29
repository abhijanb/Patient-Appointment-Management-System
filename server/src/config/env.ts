const env = {
    port:process.env.PORT,
    accessTokenSecrect:process.env.ACCESS_TOKEN_SECRECT,
    refreshTokenSecrect:process.env.REFRESH_TOKEN_SECRECT,
    databaseUrl:process.env.DATABASE_URL,
    frontendUrl:process.env.FRONTEND_URL,
    accessTokenExpiry:process.env.ACCESS_TOKEN_EXPIRY,
    adminEmail:process.env.ADMIN_EMAIL,
    adminPassword:process.env.ADMIN_PASSWORD,
}

export default env;
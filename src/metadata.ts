/* eslint-disable */
export default async () => {
    const t = {
        ["./user/dto/out/user-get.dto"]: await import("./user/dto/out/user-get.dto"),
        ["./authentication/dto/out/access-token.dto"]: await import("./authentication/dto/out/access-token.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./authentication/dto/in/register.dto"), { "RegisterDto": { email: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 10 } } }], [import("./user/dto/out/user-get.dto"), { "UserGetDto": { id: { required: true, type: () => Number }, email: { required: true, type: () => String }, firstname: { required: false, type: () => String, nullable: true }, lastname: { required: false, type: () => String, nullable: true }, avatarUrl: { required: false, type: () => String, nullable: true } } }], [import("./user/entities/user.entity"), { "UserEntity": { id: { required: true, type: () => Number }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, firstname: { required: true, type: () => String, nullable: true }, lastname: { required: true, type: () => String, nullable: true }, avatarUrl: { required: true, type: () => String, nullable: true }, resetPwdToken: { required: true, type: () => String, nullable: true } } }], [import("./user/dto/protected/user-auth.dto"), { "UserAuthDto": { id: { required: true, type: () => Number }, email: { required: true, type: () => String }, password: { required: true, type: () => String } } }], [import("./user/dto/in/user-update.dto"), { "UserUpdateDto": { id: { required: true, type: () => Number, minimum: 1 }, email: { required: true, type: () => String }, firstname: { required: false, type: () => String }, lastname: { required: false, type: () => String } } }], [import("./common/dto/string-email.dto"), { "StringEmailDto": { email: { required: true, type: () => String } } }], [import("./authentication/dto/in/login.dto"), { "LoginDto": { email: { required: true, type: () => String }, password: { required: true, type: () => String } } }], [import("./authentication/dto/out/access-token.dto"), { "AccessTokenDto": { accessToken: { required: true, type: () => String } } }], [import("./authentication/dto/protected/jwt-payload-auth.dto"), { "JwtPayloadDto": { userId: { required: true, type: () => Number }, userEmail: { required: true, type: () => String } } }], [import("./authentication/dto/in/reset-password.dto"), { "ResetPwdDto": { password: { required: true, type: () => String, minLength: 10 }, token: { required: true, type: () => String } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } } }], [import("./user/user.controller"), { "UserController": { "findAll": { type: [t["./user/dto/out/user-get.dto"].UserGetDto] }, "findById": { type: Object }, "findByEmail": { type: Object }, "update": { type: t["./user/dto/out/user-get.dto"].UserGetDto }, "uploadAvatar": { type: t["./user/dto/out/user-get.dto"].UserGetDto } } }], [import("./authentication/authentication.controller"), { "AuthenticationController": { "test": { type: Object }, "signUp": { type: t["./user/dto/out/user-get.dto"].UserGetDto }, "signIn": { type: t["./authentication/dto/out/access-token.dto"].AccessTokenDto }, "forgotPwd": {}, "resetPwd": {} } }]] } };
};
import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const Headers = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.headers[data.toLowerCase()];
})
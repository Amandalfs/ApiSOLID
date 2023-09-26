import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply){
	try {
		await request.jwtVerify({ onlyCookie: true});

		const token = await reply.jwtSign({}, {
			sign: {
				sub: request.user.sub, 
			}
		});
    
    
		const refreshToken = await reply.jwtSign({}, {
			sign: {
				sub: request.user.sub,
				expiresIn: "7d" 
			}
		});
                
    
		return reply
			.setCookie("refreshToken", refreshToken,{
				path: "/",
				signed: false,
				httpOnly: true,
				secure: true,
				sameSite: true
			})
			.status(200)
			.send({token});
    
	} catch (error) {
		return reply.status(409).send();
	}


}
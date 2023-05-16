import 'dotenv/config'
import { z } from "zod"

const schemaEnv = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333)
})

const _env = schemaEnv.safeParse(process.env)

if(_env.success === false){
    console.error('❌Invalid Enviroment variable', _env.error)

    throw new Error('Invalid Enviroment variable')
}

export const env = _env.data
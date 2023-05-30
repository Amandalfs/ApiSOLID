import { Gyn, Prisma } from "@prisma/client";

export interface IGymsRepository {
    findById(gynId: string): Promise <Gyn | null>
    create(data: Prisma.GynCreateInput): Promise <Gyn>    
    searchMany(query:string, page:number): Promise<Gyn[]>
}
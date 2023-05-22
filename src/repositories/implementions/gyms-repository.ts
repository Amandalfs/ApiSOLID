import { Gyn } from "@prisma/client";

export interface IGymsRepository {
    findById(gynId: string): Promise <Gyn | null>
}
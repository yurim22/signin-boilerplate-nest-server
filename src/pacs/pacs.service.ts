import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class PacsService {
    constructor(
        private prisma: PrismaService
    ) {}

    async getReceivedPacsInfo(data) {
        return await this.prisma.receive_pacs.findUnique(data)
    }

    async getSendPacsInfo(data) {
        return await this.prisma.send_pacs.findUnique(data)
    }
    async setReceivedPacsInfo(data: Prisma.receive_pacsUpsertArgs) {
        return await this.prisma.receive_pacs.upsert(data);
    }

    async setSendPacsInfo(data: Prisma.send_pacsUpsertArgs) {
        return await this.prisma.send_pacs.upsert(data);
    }
}

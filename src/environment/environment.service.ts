import { BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class EnvironmentService {
    constructor(
        private prisma: PrismaService
    ) {}
    async getSystemVersion() {
        var connectionTest = await this.prisma.dummy.count();

        if(connectionTest !== 0){
            throw new ServiceUnavailableException('Server connection error');
        } else {
            return connectionTest
        }
    }
}

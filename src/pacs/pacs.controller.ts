import { Prisma } from '.prisma/client';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { PacsDto } from './dto/pacs-dto';
import { PacsService } from './pacs.service';

@ApiTags('Pacs')
@Controller('api/v1/pacs')
export class PacsController {
    constructor(
        private readonly pacsService: PacsService
    ){}
    
    @UseGuards(AuthGuard('jwt'))
    @Get('/rePacs/:id')
    async getReceivedPacsInfo(@Param('id') userId: string){
        const dto: Prisma.receive_pacsFindUniqueArgs = {
            where: {user_id: userId}
        }

        return await this.pacsService.getReceivedPacsInfo(dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/sePacs/:id')
    async getSendPacsInfo(@Param('id') userId: string){
        const dto: Prisma.send_pacsFindUniqueArgs = {
            where: {user_id: userId}
        }
        
        return await this.pacsService.getSendPacsInfo(dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/rePacs/:id')
    async setReceivePacsInfo(@Param('id') userId: string, @Body() data: PacsDto) {
        const dto: Prisma.receive_pacsUpsertArgs = {
            where: {user_id: userId},
            update: {
                AE: data.ae,
                host_ip: data.ip,
                port: data.port,
                update_timestamp: new Date()
            },
            create: {
                AE: data.ae,
                host_ip: data.ip,
                port: data.port,
                user_id: userId
            }
        }
        return await this.pacsService.setReceivedPacsInfo(dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/sePacs/:id')
    async setSendPacsInfo(@Param('id') userId: string, @Body() data: PacsDto) {
        const dto: Prisma.send_pacsUpsertArgs = {
            where: {user_id: userId},
            update: {
                AE: data.ae,
                client_ip: data.ip,
                port: data.port,
                update_timestamp: new Date()
            },
            create: {
                AE: data.ae,
                client_ip: data.ip,
                port: data.port,
                user_id: userId
            }
        }
        return await this.pacsService.setSendPacsInfo(dto)
    }
}

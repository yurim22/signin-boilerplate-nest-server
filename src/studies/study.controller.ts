import { series, study } from '.prisma/client';
import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { StudyService } from './study.service';

@Controller('studies')
export class StudiesController {
    constructor(
        private readonly studyService: StudyService
    ){}
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getStudyList(): Promise<study[]> {
        
        return await this.studyService.getStudyList();
    }
    // @UseGuards(AuthGuard('jwt'))
    // @Get()
    // async getStudyList(): Promise<study[]> {
        
    //     return await this.studyService.getStudyList();
    // }

    @UseGuards(AuthGuard('jwt'))
    @Get(':seq')
    async getSeriesImg(@Param('seq') study_seq: string): Promise<series> {
        const studySeqToInt = parseInt(study_seq)
        const dto: Prisma.seriesFindUniqueArgs = {
            where: {
                study_seq: studySeqToInt
            }
        }
        return await this.studyService.getSeriesImg(dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':seq')
    async updateStudyStatus(@Param('seq') study_seq: string, @Body() data): Promise<study> {
        const studySeqToInt = parseInt(study_seq)
        const dto: Prisma.studyUpdateArgs = {
            where: {
                seq: studySeqToInt
            },
            include: {
                patient: true
            },
            data: {
                status: data.status
            }
        }
        return await this.studyService.updateStudyStatus(dto)
    }
}

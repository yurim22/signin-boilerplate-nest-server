import { series, study } from '.prisma/client';
import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { StudyService } from './study.service';

@ApiTags('Study')
@Controller('api/v1/studies')
export class StudiesController {
    constructor(
        private readonly studyService: StudyService
    ){}
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getStudyList(
        @Query('status') statusParams:string, 
        @Query('patient_id') idParams:string,
        @Query('patient_name') nameParams: string, 
        @Query('study_date') studyDateParams: string, 
        @Query('analysis_date') analysisDateParams: string,
        @Query('limit') limitParams: string,
        @Query('skip') skipParams: string,
    ): Promise<study[]> {
        return await this.studyService.getStudyList(statusParams, idParams, nameParams, studyDateParams, analysisDateParams, limitParams, skipParams);
    }

    @Get('studiesCount')
    async countStudyData(
        @Query('status') statusParams:string, 
        @Query('patient_id') idParams:string,
        @Query('patient_name') nameParams: string, 
        @Query('study_date') studyDateParams: string, 
        @Query('analysis_date') analysisDateParams: string,
    ): Promise<number> {
        return await this.studyService.countStudyData(statusParams, idParams, nameParams, studyDateParams, analysisDateParams)
    }

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
                status: data.updateStudyData.status,
                confirmed_by: data.userInfo.name,
                confirm_user_id: data.userInfo.id,
                confirmed_date: data.updateStudyData.confirmed_date
            }
        }
        return await this.studyService.updateStudyStatus(dto)
    }

}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class StudyService {
    constructor(
        private prisma: PrismaService
    ){}


    async getStudyList(queryParams){
        console.log('queryParms 입니다아아아',queryParams);
        if(queryParams === undefined) {
            console.log('undefined다아')
            return [];
        } else{
            return await this.prisma.study.findMany({
                where:{
                    status: {in : queryParams}
                },
                include: {
                    patient: true
                }
            });
        }   
    }

    async getSeriesImg(data){
        return await this.prisma.series.findUnique(data)
    }

    async updateStudyStatus(data) {
        return await this.prisma.study.update(data)
    }

    async getStudyListWithParam(queryParams) {
        console.log(queryParams)
        console.log(typeof queryParams)
        return await this.prisma.study.findMany({
            where:{
                status: queryParams
            },
            include: {
                patient: true
            }
        })
    }

    
}

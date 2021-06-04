import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class StudyService {
    constructor(
        private prisma: PrismaService
    ){}


    async getStudyList(statusParams:any, idParams:string, nameParams:string){
        console.log('statusParams', statusParams);
        console.log('idParams', idParams);
        console.log('nameParams', nameParams);
        if(statusParams === undefined && idParams === undefined && nameParams === undefined){
            return await this.prisma.study.findMany({
                include: {
                    patient: true
                }
            })
        } else if(statusParams === undefined) {
            return await this.prisma.study.findMany({
                where: {
                    AND: [
                        {patient_id : {contains: idParams}},
                        {patient: {
                            patient_name: {contains: nameParams}
                        }}
                    ]
                },
                include: {
                    patient: true
                }
            })
        } else{
            const statusParamsArray = statusParams.toUpperCase().split(',');
            return await this.prisma.study.findMany({
                where:{
                    AND: [
                        {status: {in : statusParamsArray}},
                        {patient_id : {contains: idParams}},
                        {patient: {
                            patient_name: {contains: nameParams}
                        }}
                    ]
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

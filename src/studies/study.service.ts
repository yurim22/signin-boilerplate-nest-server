import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class StudyService {
    constructor(
        private prisma: PrismaService
    ){}


    async getStudyList(statusParams:any, idParams:string, nameParams:string, studyDateParams: string, analysisDateParams:string){
        console.log('statusParams', statusParams);
        console.log('idParams', idParams);
        console.log('nameParams', nameParams);
        console.log('studyDateParams', studyDateParams);
        console.log('analysisDateParams', analysisDateParams);
        if(statusParams === undefined && idParams === undefined && nameParams === undefined && studyDateParams === undefined){
            return await this.prisma.study.findMany({
                include: {
                    patient: true
                }
            })
        } 
        // statusParams -> undefined 일 때
        else if(statusParams === undefined) {
            if(studyDateParams === undefined && analysisDateParams === undefined){
                return await this.prisma.study.findMany({
                    where: {
                        AND: [
                            {patient_id : {contains: idParams}},
                            {patient: {
                                patient_name: {contains: nameParams}
                            }},
                        ]
                    },
                    include: {
                        patient: true
                    }
                })
            } else if(analysisDateParams === undefined) {
                return await this.prisma.study.findMany({
                    where: {
                        AND: [
                            {patient_id : {contains: idParams}},
                            {patient: {
                                patient_name: {contains: nameParams}
                            }},
                            {study_date : {
                                gte : new Date(studyDateParams.slice(0,10)),
                                lte : new Date(studyDateParams.slice(11,21))
                            }},
                            // {analysis_date : {
                            //     gte : new Date(analysisDateParams.slice(0,10)),
                            //     lte : new Date(analysisDateParams.slice(11,20))
                            // }}
                        ]
                    },
                    include: {
                        patient: true
                    }
                })
            } else if(studyDateParams === undefined) {
                return await this.prisma.study.findMany({
                    where: {
                        AND: [
                            {patient_id : {contains: idParams}},
                            {patient: {
                                patient_name: {contains: nameParams}
                            }},
                            // {study_date : {
                            //     gte : new Date(studyDateParams.slice(0,10)),
                            //     lte : new Date(studyDateParams.slice(11,21))
                            // }},
                            {analysis_date : {
                                gte : new Date(analysisDateParams.slice(0,10)),
                                lte : new Date(analysisDateParams.slice(11,21))
                            }}
                        ]
                    },
                    include: {
                        patient: true
                    }
                })
            } else{
                return await this.prisma.study.findMany({
                    where: {
                        AND: [
                            {patient_id : {contains: idParams}},
                            {patient: {
                                patient_name: {contains: nameParams}
                            }},
                            {study_date : {
                                gte : new Date(studyDateParams.slice(0,10)),
                                lte : new Date(studyDateParams.slice(11,21))
                            }},
                            {analysis_date : {
                                gte : new Date(analysisDateParams.slice(0,10)),
                                lte : new Date(analysisDateParams.slice(11,21))
                            }}
                        ]
                    },
                    include: {
                        patient: true
                    }
                })
            }
        } 
        // statusParams이 정해져있다고 한다면,
        else{
            const statusParamsArray = statusParams.toUpperCase().split(',');
            if (studyDateParams === undefined && analysisDateParams === undefined){
                return await this.prisma.study.findMany({
                    where:{
                        AND: [
                            {status: {in : statusParamsArray}},
                            {patient_id : {contains: idParams}},
                            {patient: {
                                patient_name: {contains: nameParams}
                            }},
                            // {study_date : {
                            //     gte : new Date(studyDateParams.slice(0,10)),
                            //     lte : new Date(studyDateParams.slice(11,20))
                            // }},
                            // {analysis_date : {
                            //     gte : new Date(analysisDateParams.slice(0,10)),
                            //     lte : new Date(analysisDateParams.slice(11,20))
                            // }}
                        ]
                    },
                    include: {
                        patient: true
                    }
                });
            } else if (analysisDateParams === undefined) {
                console.log('studyParams', studyDateParams);
                console.log(new Date(studyDateParams.slice(0,10)));
                console.log(new Date(studyDateParams.slice(11,21)));
                return await this.prisma.study.findMany({
                    where:{
                        AND: [
                            {status: {in : statusParamsArray}},
                            {patient_id : {contains: idParams}},
                            {patient: {
                                patient_name: {contains: nameParams}
                            }},
                            {study_date : {
                                gte : new Date(studyDateParams.slice(0,10)),
                                lte : new Date(studyDateParams.slice(11,21))
                            }},
                            // {analysis_date : {
                            //     gte : new Date(analysisDateParams.slice(0,10)),
                            //     lte : new Date(analysisDateParams.slice(11,20))
                            // }}
                        ]
                    },
                    include: {
                        patient: true
                    }
                });
            } else if (studyDateParams === undefined) {
                return await this.prisma.study.findMany({
                    where:{
                        AND: [
                            {status: {in : statusParamsArray}},
                            {patient_id : {contains: idParams}},
                            {patient: {
                                patient_name: {contains: nameParams}
                            }},
                            // {study_date : {
                            //     gte : new Date(studyDateParams.slice(0,10)),
                            //     lte : new Date(studyDateParams.slice(11,20))
                            // }},
                            {analysis_date : {
                                gte : new Date(analysisDateParams.slice(0,10)),
                                lte : new Date(analysisDateParams.slice(11,21))
                            }}
                        ]
                    },
                    include: {
                        patient: true
                    }
                });
            } else {
                return await this.prisma.study.findMany({
                    where:{
                        AND: [
                            {status: {in : statusParamsArray}},
                            {patient_id : {contains: idParams}},
                            {patient: {
                                patient_name: {contains: nameParams}
                            }},
                            {study_date : {
                                gte : new Date(studyDateParams.slice(0,10)),
                                lte : new Date(studyDateParams.slice(11,21))
                            }},
                            {analysis_date : {
                                gte : new Date(analysisDateParams.slice(0,10)),
                                lte : new Date(analysisDateParams.slice(11,21))
                            }}
                        ]
                    },
                    include: {
                        patient: true
                    }
                });
            }
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

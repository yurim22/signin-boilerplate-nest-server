import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class StudyService {
    constructor(
        private prisma: PrismaService
    ){}


    async getStudyList(
        statusParams:any, 
        idParams:string, 
        nameParams:string, 
        studyDateParams: string, 
        analysisDateParams:string,
        limitParams: string,
        skipParams: string){
        const limitParamsToInt = parseInt(limitParams);
        const skipParamsToInt = parseInt(skipParams)

        if(statusParams === undefined && idParams === undefined && nameParams === undefined && studyDateParams === undefined){
            const result = await this.prisma.study.findMany({include:{patient: true}, take: limitParamsToInt, skip: skipParamsToInt})
            
            return result
        } 
        // statusParams -> undefined 일 때
        else if(statusParams === undefined || statusParams === '') {
            if(studyDateParams === undefined && analysisDateParams === undefined){
                const result = await this.prisma.study.findMany({
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
                    },
                    take: limitParamsToInt, skip: skipParamsToInt
                })
                return result;
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
                        ]
                    },
                    include: {
                        patient: true
                    },
                    take: limitParamsToInt, skip: skipParamsToInt
                })
            } else if(studyDateParams === undefined) {
                return await this.prisma.study.findMany({
                    where: {
                        AND: [
                            {patient_id : {contains: idParams}},
                            {patient: {
                                patient_name: {contains: nameParams}
                            }},
                            {analysis_date : {
                                gte : new Date(analysisDateParams.slice(0,10)),
                                lte : new Date(analysisDateParams.slice(11,21))
                            }}
                        ]
                    },
                    include: {
                        patient: true
                    },
                    take: limitParamsToInt, skip: skipParamsToInt
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
                    },
                    take: limitParamsToInt, skip: skipParamsToInt
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
                        ]
                    },
                    include: {
                        patient: true
                    },
                    take: limitParamsToInt, skip: skipParamsToInt
                });
            } else if (analysisDateParams === undefined) {
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
                        ]
                    },
                    include: {
                        patient: true
                    },
                    take: limitParamsToInt, skip: skipParamsToInt
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
                            {analysis_date : {
                                gte : new Date(analysisDateParams.slice(0,10)),
                                lte : new Date(analysisDateParams.slice(11,21))
                            }}
                        ]
                    },
                    include: {
                        patient: true
                    },
                    take: limitParamsToInt, skip: skipParamsToInt
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
                    },
                    take: limitParamsToInt, skip: skipParamsToInt
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
        return await this.prisma.study.findMany({
            where:{
                status: queryParams
            },
            include: {
                patient: true
            }
        })
    }

    // 코드 진짜.. prisma... refactoring 해야햐ㅜㅠㅜ
    async countStudyData(statusParams:any, idParams:string, nameParams:string, studyDateParams: string, analysisDateParams:string) {
        if(statusParams === undefined && idParams === undefined && nameParams === undefined && studyDateParams === undefined){
            const result = await this.prisma.study.count()
            
            return result
        } 
        // statusParams -> undefined 일 때
        else if(statusParams === undefined) {
            if(studyDateParams === undefined && analysisDateParams === undefined){
                const result = await this.prisma.study.count({
                    where: {
                        AND: [
                            {patient_id : {contains: idParams}},
                            {patient: {
                                patient_name: {contains: nameParams}
                            }},
                        ]
                    },
                })
                return result;
            } else if(analysisDateParams === undefined) {
                return await this.prisma.study.count({
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
                        ]
                    },
                })
            } else if(studyDateParams === undefined) {
                return await this.prisma.study.count({
                    where: {
                        AND: [
                            {patient_id : {contains: idParams}},
                            {patient: {
                                patient_name: {contains: nameParams}
                            }},
                            {analysis_date : {
                                gte : new Date(analysisDateParams.slice(0,10)),
                                lte : new Date(analysisDateParams.slice(11,21))
                            }}
                        ]
                    }
                })
            } else{
                return await this.prisma.study.count({
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
                    }
                })
            }
        } 
        // statusParams이 정해져있다고 한다면,
        else{
            const statusParamsArray = statusParams.toUpperCase().split(',');
            if (studyDateParams === undefined && analysisDateParams === undefined){
                return await this.prisma.study.count({
                    where:{
                        AND: [
                            {status: {in : statusParamsArray}},
                            {patient_id : {contains: idParams}},
                            {patient: {
                                patient_name: {contains: nameParams}
                            }},
                        ]
                    }
                });
            } else if (analysisDateParams === undefined) {
                return await this.prisma.study.count({
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
                        ]
                    },
                });
            } else if (studyDateParams === undefined) {
                return await this.prisma.study.count({
                    where:{
                        AND: [
                            {status: {in : statusParamsArray}},
                            {patient_id : {contains: idParams}},
                            {patient: {
                                patient_name: {contains: nameParams}
                            }},
                            {analysis_date : {
                                gte : new Date(analysisDateParams.slice(0,10)),
                                lte : new Date(analysisDateParams.slice(11,21))
                            }}
                        ]
                    },
                });
            } else {
                return await this.prisma.study.count({
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
                });
            }
        }
    }
}

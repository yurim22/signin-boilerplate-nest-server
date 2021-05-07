import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class StudyService {
    constructor(
        private prisma: PrismaService
    ){}

    // async getStudyList(){
    //     return await this.prisma.study.findMany();
    // }
    async getStudyList(){
        return await this.prisma.study.findMany({
            include: {
                patient: true
            }
        });
    }

    async getSeriesImg(data){
        return await this.prisma.series.findUnique(data)
    }

    async updateStudyStatus(data) {
        return await this.prisma.study.update(data)
    }
}

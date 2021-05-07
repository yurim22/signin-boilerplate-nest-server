import { Controller, Get } from '@nestjs/common';
import { EnvironmentService } from './environment.service';

@Controller('environment')
export class EnvironmentController {
    constructor(private readonly environmentService: EnvironmentService){}
    @Get()
    async getSystemVersion() {
        return await this.environmentService.getSystemVersion();
    }
}

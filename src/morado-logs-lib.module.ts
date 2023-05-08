import { Module, Logger } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { MoradoLogs } from './morado-logs-lib.service';
import * as utils from './utils';

@Module({
  imports: [
    WinstonModule.forRoot({
      levels: { debug: 0, info: 0, error: 0 },
      transports: [utils.winstonConsoleInfo()],
    }),
  ],
  providers: [MoradoLogs, Logger],
  exports: [MoradoLogs],
})
export class MoradoLogsLibModule {}

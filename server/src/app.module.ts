import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule],
	controllers: [],
	providers: [PrismaService]
})
export class AppModule {}

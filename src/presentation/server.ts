import { envs } from "../config/plugins/envs.plugin"
import { LogSeverityLevel } from "../domain/entities/log.entity"
import { CheckService } from "../domain/use-cases/checks/check-service"
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple"
import { sendEmailLogs } from "../domain/use-cases/email/send.-logs"
import { FIleSystemDataSource } from "../infraestructure/datasources/file-system.datasource"
import { MongoLogDataSource } from "../infraestructure/datasources/mongo.datasource"
import { PostgresLogDatasource } from "../infraestructure/datasources/postgresql-log.datasource"
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.implementation';
import { CronService } from "./cron/cron-service"
import { Emailservice } from "./email/email.service"

// const logRepository = new LogRepositoryImpl(
//     //new FIleSystemDataSource()
//     //new MongoLogDataSource()
//     new PostgresLogDatasource()
// )

const fsLogRepository = new LogRepositoryImpl(
    new FIleSystemDataSource()
)

const mongoLogTRepository = new LogRepositoryImpl(
    new MongoLogDataSource())

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
)

const emailService = new Emailservice(
    //fileSystemLogRepository
)

export class Server {
    
    

    public static async start(){
        console.log("Server started ...")

        // SEND EMAIL

        // const emailService = new Emailservice();
        // emailService.sendEmail({
        //     to:"ijmm1717@gmail.com",
        //     subject: "LOGS SISTEMA",
        //     htmlbody: `
        //     <h2>SISTEM LOGS</h2>
        //     <p>This is a log informative mail</p>

        //     <p>Check logs</p>
        //     `
        // })

        // new sendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ['ijmm1717@gmail.com','jzaff71@gmail.com']
        // )
        // emailService.sendEmailWithFileSystemLogs(
        //     ['ijmm1717@gmail.com','jzaff71@gmail.com']
        // //     //"ijmm1717@gmail.com"
        // )

        // CRON JOB
        // CronService.createJob('*/5 * * * * *',()=>{
        //     new CheckService(
        //         fileSystemLogRepository,
        //         // () => console.log("Success"), //Inyección de Dependencias
        //         // (error) => console.log(error),
        //         undefined,
        //         undefined
        //     ).execute("http://localhost:3000")
        // })

        // CronService.createJob('*/5 * * * * *',()=>{
        //     new CheckService(
        //         logRepository,
        //         // () => console.log("Success"), //Inyección de Dependencias
        //         // (error) => console.log(error),
        //         undefined,
        //         undefined
        //     ).execute("http://google.com")
        // })

        CronService.createJob('*/5 * * * * *',()=>{
            new CheckServiceMultiple(
                [fsLogRepository, mongoLogTRepository,postgresLogRepository],
                // () => console.log("Success"), //Inyección de Dependencias
                // (error) => console.log(error),
                undefined,
                undefined
            ).execute("http://googllklllje.com")
        })


        // const logs = await logRepository.getLogs(LogSeverityLevel.low)
        // console.log(logs)
    }

}
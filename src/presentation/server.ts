import { CheckService } from "../domain/use-cases/checks/check-service"
import { FIleSystemDataSource } from "../infraestructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.implementation"
import { CronService } from "./cron/cron-service"

const fileSystemLogRepository = new LogRepositoryImpl(
    new FIleSystemDataSource()
)

export class Server {
    

    public static start(){
        console.log("Server started ...")

        CronService.createJob('*/5 * * * * *',()=>{
            new CheckService(
                fileSystemLogRepository,
                // () => console.log("Success"), //Inyección de Dependencias
                // (error) => console.log(error),
                undefined,
                undefined
            ).execute("http://localhost:3000")
        })
    }

}
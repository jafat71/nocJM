import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"

interface CheckServiceUseCase {
    execute(url: string) : Promise<boolean>
}

type SuccessCallback =( () => void ) | undefined
type ErrorCallback = ((error: string) => void) | undefined

export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ){}
    
    public async execute(url: string) : Promise<boolean>{

        const logEntityOptions =  {
            level: LogSeverityLevel.low,
            message: `Service ${ url } working `,
            origin: "./check-service.ts",
        }

        try {
            const req = await fetch(url)
            if(!req.ok){
                throw new Error("Error on checkService: " + url)
            }

            const log = new LogEntity(logEntityOptions)
            this.logRepository.saveLog( log )
            this.successCallback && this.successCallback()
            return true
        }catch(error){
            const errorMsg = `${ url } not working: Error: ${ error }`
            logEntityOptions.message = errorMsg
            const log = new LogEntity(logEntityOptions)
            this.logRepository.saveLog(log)
            this.errorCallback && this.errorCallback(errorMsg)
            return false
        }
    }
}
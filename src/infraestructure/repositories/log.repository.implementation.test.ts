import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"
import { LogRepositoryImpl } from "./log.repository.implementation"

describe('Log Repository IMplementation', () => {

    const mocklogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const logRepository = new LogRepositoryImpl(mocklogDatasource)

    
    const log = {
        level:LogSeverityLevel.high,
        message: "msg"
    } as LogEntity

    

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test('savelog should call the datasource with args', async () => {
        await logRepository.saveLog(log)
        expect(mocklogDatasource.saveLog).toHaveBeenCalledWith(log)
    })

    test('getLogs should call datasource with args', async () => {
        await logRepository.getLogs(LogSeverityLevel.low)
        expect(mocklogDatasource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low)
    })
})


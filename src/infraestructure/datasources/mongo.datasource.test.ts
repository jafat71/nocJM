import mongoose from "mongoose"
import { envs } from "../../config/plugins/envs.plugin"
import { LogModel, MongoDB } from "../../data/mongo"
import { MongoLogDataSource } from "./mongo.datasource"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"

describe('Mongo Datasource', () => {

    beforeAll(async ()=>{
        await MongoDB.connect({
            mongoURL: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        })
    })

    afterEach(async ()=>{
        await LogModel.deleteMany()
    })

    afterAll(async ()=>{
        await mongoose.connection.close()
    })

    const logDataSource = new MongoLogDataSource()

    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'test-message',
        origin:"mongo.datasource.ts"
    })

    test('should create a log', async () => {

        const logSpy = jest.spyOn(console, 'log')


        await logDataSource.saveLog(log)

        expect(logSpy).toHaveBeenCalled()
        expect(logSpy).toHaveBeenCalledWith(expect.any(String))
    })

    test('should get all logs', async () => {
        await logDataSource.saveLog(log)
        const logs = await logDataSource.getLogs( LogSeverityLevel.medium )
        expect(logs.length).toBe(1)
        expect(logs[0].level).toBe(LogSeverityLevel.medium)
    })

})

import { LogEntity, LogSeverityLevel } from "../entities/log.entity"
import { LogDataSource } from "./log.datasource"

describe('log.datasource.ts ', () => {

    const newLog = {
        origin: 'log.datasource.ts',
        message: 'Test MSG',
        level: LogSeverityLevel.high,
        createdAt: new Date()
    }

    class MockLogDatasource implements LogDataSource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }

    }

    test('should test the abstract class', async () => {

        const mocklogDataSource = new MockLogDatasource()

        expect(mocklogDataSource).toBeInstanceOf(MockLogDatasource)
        expect(mocklogDataSource).toHaveProperty('saveLog')
        expect(mocklogDataSource).toHaveProperty('getLogs')

        await mocklogDataSource.saveLog(newLog)

        const logs = await mocklogDataSource.getLogs(LogSeverityLevel.high)
        expect(logs).toHaveLength(1)
    })
})
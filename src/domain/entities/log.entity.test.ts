import { LogEntity, LogSeverityLevel } from "./log.entity"

describe('LogEntity', () => {
  
    const data = new LogEntity({
        message:"HolaMundo",
        level: LogSeverityLevel.high,
        origin: 'log.entity.ts'
    })

    test('should return a LogEntity instance', () => { 


        const log = new LogEntity(data)

        expect(log).toBeInstanceOf( LogEntity)
        expect(log.message).toBe( data.message)
        expect(log.level).toBe( data.level)
        expect(log.origin).toBe( data.origin)
        expect(log.createdAt).toBeInstanceOf( Date )

     })

     test('should create a LogEntity instabce from JSON', () => {

        const json = `{"message":"TypeError: fetch failed","level":"low","createdAt":"2023-11-21T14:05:10.059Z","origin":"C:/Users/HP/Desktop/EPN/SLF/NODE/monitoreo/src/domain/use-cases/checks"}
        `

        const log = LogEntity.fromJson(json)

        expect(log).toBeInstanceOf( LogEntity)
        expect(log.message).toBe("TypeError: fetch failed")
        expect(log.level).toBe(LogSeverityLevel.low)
        expect(log.origin).toBe("C:/Users/HP/Desktop/EPN/SLF/NODE/monitoreo/src/domain/use-cases/checks")
        expect(log.createdAt).toBeInstanceOf( Date )

     })

     test('should create a Log Entity instance from object', () => { 
        const log = LogEntity.fromObject(data)

        expect(log).toBeInstanceOf( LogEntity)
        expect(log.message).toBe( data.message)
        expect(log.level).toBe( data.level)
        expect(log.origin).toBe( data.origin)
        expect(log.createdAt).toBeInstanceOf( Date )
    })

})

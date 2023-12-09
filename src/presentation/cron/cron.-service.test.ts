import { CronService } from "./cron-service"

describe('Cron Service', () => {

    const mockTick = jest.fn()

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test('should create a job', () => {

        const job = CronService.createJob('* * * * * *',mockTick)
        setTimeout(()=>{
            expect(mockTick).toHaveBeenCalledTimes(2)
            job.stop()
        },2000)
    })
})

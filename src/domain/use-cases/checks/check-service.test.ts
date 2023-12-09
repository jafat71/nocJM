import { after } from "node:test"
import { LogEntity } from "../../entities/log.entity"
import { CheckService } from "./check-service"

describe('CheckService UseCase', () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCallback = jest.fn()
    const errorCallback = jest.fn()

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    afterAll(()=>{
        jest.clearAllMocks()
    })

    const checkService = new CheckService(
        mockRepository,
        successCallback,
        errorCallback
    );
  
    test('should call successCallback when fetch returns true', async () => { 

        const wasOk = await checkService.execute("https://www.google.com")
        expect(wasOk).toBeTruthy()
        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
     })

     test('should call errorCallback when fetch returns false', async () => { 

        const wasOk = await checkService.execute("https://www.googsfsdle.com")
        expect(wasOk).toBeFalsy()
        expect(successCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
     })
})

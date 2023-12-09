import { LogEntity } from "../../entities/log.entity"
import { CheckServiceMultiple } from "./check-service-multiple"

describe('CheckService-Multiple UseCase', () => {

    const mockRepositoryOne = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const mockRepositoryTwo = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCallback = jest.fn()
    const errorCallback = jest.fn()

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    afterEach(()=>{
        jest.clearAllMocks()
    })

    const checkService = new CheckServiceMultiple(
        [mockRepositoryOne, mockRepositoryTwo],
        successCallback,
        errorCallback
    );
  
    test('should call successCallback when fetch returns true', async () => { 

        const wasOk = await checkService.execute("https://www.google.com")
        expect(wasOk).toBeTruthy()
        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()

        expect(mockRepositoryOne.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepositoryTwo.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
     })

     test('should call errorCallback when fetch returns false', async () => { 

        const wasOk = await checkService.execute("https://www.googsfsdle.com")
        expect(wasOk).toBeFalsy()
        expect(successCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()

        expect(mockRepositoryOne.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
        expect(mockRepositoryTwo.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
     })
})

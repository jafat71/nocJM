import { Emailservice } from "../../../presentation/email/email.service"
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { sendEmailLogs } from "./send.-logs"

describe('Send Logs', () => {

    

    const mockEmailService = {
        sendEmail: jest.fn(),
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }

    const mockLogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const sendEmail = new sendEmailLogs(
        mockEmailService as any,
        mockLogRepository
    )
    
    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test('should send email amd generate log', async () => {

        const result = await sendEmail.execute("ijmm1717@gmail.com")
        expect(result).toBeTruthy()
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "low",
            "message": "Log Email sent!",
            "origin": "send-email-logs.ts",
        })
    })

    test('should log in case of error', async () => {

        mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false)

        const result = await sendEmail.execute("ijmm1717@gmail.com")
        expect(result).toBeFalsy()
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "high",
            "message": "Error: Error: Email Log not sent!",
            "origin": "send-email-logs.ts",
        })
    })
})

import { Emailservice, SendMailOptions } from "./email.service"
import nodemailer from 'nodemailer';
describe('Email Service', () => {

    const mockSendMail = jest.fn()

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    })
    const emaiLService = new Emailservice()

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test('should send email ', async () => {

        const options: SendMailOptions = {
            to: "ijmm1717@gmail.com",
            subject: "test",
            htmlbody: '<h1>TEST</h1>'
        }

        await emaiLService.sendEmail(options)

        expect(mockSendMail).toHaveBeenCalledWith({
            "attachments": expect.any(Array),
            "html": "<h1>TEST</h1>",
            "subject": "test",
            "to": "ijmm1717@gmail.com",
        })

    })

    test('should send email with attachments',async () => { 

        const email = 'ijmm1717@gmail.com'
        await emaiLService.sendEmailWithFileSystemLogs(email)  

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: "Logs del Server",
            html: expect.any(String),
            attachments: expect.arrayContaining([
                {
                    filename: "logs-all.log",
                    path: "../monitoreo/logs/logs-all.log",
                },
                {
                    filename: "logs-high.log",
                    path: "../monitoreo/logs/logs-high.log",
                },
                {
                    filename: "logs-medium.log",
                    path: "../monitoreo/logs/logs-medium.log",
                },
            ]),
        })
     })

})

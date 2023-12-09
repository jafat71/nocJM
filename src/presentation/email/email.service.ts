import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlbody: string;
    attachments?: Attachment[]
}

export interface Attachment {
    filename: string;
    path: string
}
export class Emailservice {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_MAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    //ID
    // constructor(
    //     private readonly logRepository: LogRepository,
    // ){}

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlbody, attachments = [] } = options

        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlbody,
                attachments: attachments
            })

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent',
                origin: 'email.service.ts'
            })
            // this.logRepository.saveLog(log)
            return true
        } catch (error) {
            
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email NOT SENT sent. Error: ' + error,
                origin: 'email.service.ts'
            })
            // this.logRepository.saveLog(log)
            return false
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del Server'
        const htmlbody = `

        <h2>SISTEM LOGS</h2>
        <p>This is a log informative mail</p>
        <p>Check logs</p>

        `

        const attachments:Attachment[] = [
            {filename:'logs-all.log',path:'../monitoreo/logs/logs-all.log'},
            {filename:'logs-high.log',path:'../monitoreo/logs/logs-high.log'},
            {filename:'logs-medium.log',path:'../monitoreo/logs/logs-medium.log'},
        ]

        return this.sendEmail({
            to:to,
            subject:subject,
            htmlbody:htmlbody,
            attachments
        })
    }
}
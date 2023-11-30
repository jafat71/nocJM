import { PrismaClient } from "@prisma/client"
import { envs } from "./config/plugins/envs.plugin"
import { LogModel, MongoDB } from "./data/mongo"
import { Server } from "./presentation/server"


(async()=>{
    main()
})()

async function main(){

    try {
        await MongoDB.connect({
            mongoURL: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME,
        })

        //const prisma = new PrismaClient()
        // const newLog = await prisma.logModel.create({
        //     data: {
        //         level: 'HIGH',
        //         message: "Test Message",
        //         origin: "app.ts"
        //     }
        // })
        // console.log(newLog)

    }catch(error){
        console.log("Error in connection: " + error)
    }

    // const newLog = await LogModel.create({
    //     message:"Test Mongo 3",
    //     origin: "app.ts",
    //     level: "low"
    // })

    // await newLog.save()
    // console.log(newLog)

    Server.start()
}



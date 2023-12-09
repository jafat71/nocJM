import { envs } from "./envs.plugin"


describe('envs.plugin.ts' ,() => {
    test('should retun env options',()=>{

        console.log(envs)
        expect(envs).toEqual({
            PORT: 8000,
            MAILER_MAIL: 'ijmm7171@gmail.com',
            MAILER_SECRET_KEY: 'rvbz xykx wugq cypt',
            PROD: false,
            MAILER_SERVICE: 'gmail',
            MONGO_URL: 'mongodb://jssafat:123456@localhost:27016',
            MONGO_DB_NAME: 'NOC_TEST',
            MONGO_USER: 'jssafat',
            MONGO_PASS: '123456'
          })
    })

    test('should return error if not found env',async ()=>{
        jest.resetModules()
        process.env.PORT = "ABC"

        try {
            await import('./envs.plugin')
            expect(true).toBe(false)
        }catch(error){
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }
    })
})
import supertest from 'supertest'
import {MongoMemoryServer} from 'mongodb-memory-server'
import createServer from '../utils/server'
import  mongoose  from 'mongoose';


const app = createServer();

describe('product', () => {
    //runs before all tests
    beforeAll(async()=>{
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    //runs after all tests
    afterAll( async ()=>{
await mongoose.disconnect();
await mongoose.connection.close();
    })
    describe('Get product route', () => {
        describe('given the product does not exist', () => {
            it('should return a 404', async ()=>{
                const product_id = "product_123";
                await supertest(app).get(`/api/products/${product_id}`).expect(404);
            })
        })
    })
})
import axios from "axios";
const proto:any = Array.prototype
describe("Call to models routes of the API",()=>{
    test('Models are there', async () => {
        const { data } = await axios("http://localhost:3000/models")
        expect(data[0]).toHaveProperty("id");
    });
    
    test('Only greater than works', async () => {
        const { data } = await axios("http://localhost:3000/models?greater=300000")
        const minimum = Math.min(...data.map((x:any) => x.average_price))
        expect(Number(minimum)).toBeGreaterThan(300000);
        
    });
    
    test('Only lower than works', async () => {
        const { data } = await axios("http://localhost:3000/models?lower=300000")
        const maximum = Math.max(...data.map((x:any) => x.average_price))
        expect(Number(maximum)).toBeLessThan(300000);
    });

    test('Lower than and greater than range works', async () => {
        const { data } = await axios("http://localhost:3000/models?lower=300000&greater=100000")
        const maximum = Math.max(...data.map((x:any) => x.average_price))
        const minimum = Math.min(...data.map((x:any) => x.average_price))
        expect(Number(maximum)).toBeLessThan(300000);
        expect(Number(minimum)).toBeGreaterThan(100000);
    });

})
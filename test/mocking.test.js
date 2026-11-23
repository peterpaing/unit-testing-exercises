import {it, expect, describe, vi} from 'vitest';
import {getShippingInfo,submitOrder} from '../src/mocking';
import {getShippingQuote} from '../src/libs/shipping';
import {charge} from '../src/libs/payment';
import {getDiscount} from '../src/mocking';

vi.mock('../src/libs/shipping')
vi.mock('../src/libs/payment')


describe('getShippingInfo',()=>{

    it('should return shipping costs and estimated days',()=>{
        vi.mocked(getShippingQuote).mockReturnValue({cost: 5, estimatedDays: 3})
        const result =  getShippingInfo('New York')
        expect(result).toMatch(/cost: \$5/i)
        expect(result).toMatch(/3 days/i)
    })

    it('should return shipping unavailable when quote is null',()=>{
        vi.mocked(getShippingQuote).mockReturnValue(null)
        const restult = getShippingInfo('Mars')
        expect(restult).toMatch(/unavailable/i)
    })
})

describe('submitOrder',()=>{
        
        const order = { totalAmount: 10 };
        const creditCard = { creditCardNumber: '1234' };

        it('should charge the customer', async () => {
            vi.mocked(charge).mockResolvedValue({ status: 'success' });

            await submitOrder(order, creditCard);

            expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
            });


        it('should return success object with true when payment is successful',async()=>{
            vi.mocked(charge).mockResolvedValue({status: 'success'})
            const result = await submitOrder(order, creditCard)
            expect(result).toEqual({success: true})
        })

        it('should return failed object with error when payment is failed',async()=>{
            vi.mocked(charge).mockResolvedValue({status: 'failed'})
            const result = await submitOrder(order, creditCard)
            expect(result).toEqual({success: false, error: 'payment_error'})
        })
})

describe('getDiscount',()=>{
    it('should return 0.2 when the current date is ChristmasDay',()=>{
        vi.setSystemTime(new Date('2023-12-25T12:00:00Z'))
        const result = getDiscount()
        expect(result).toBe(0.2)    
    })

    it('should return 0 when the current date is not ChristmasDay',()=>{
        vi.setSystemTime(new Date('2023-12-26T12:00:00Z'))
        const result = getDiscount()
        expect(result).toBe(0)    
    })

    it('should return 0.2 when the current time is last minute of ChristmasDay',()=>{
         vi.setSystemTime('2023-12-25 23:59');
         const result = getDiscount()
         expect(result).toBe(0.2); 
    })

    it('should return 0 when the current time after one minute of ChristmasDay',()=>{
         vi.setSystemTime('2023-12-25 24:00');
         const result = getDiscount()
         expect(result).toBe(0); 
    })
})
import {it, expect, describe, vi} from 'vitest';
import {getShippingInfo,submitOrder} from '../src/mocking';
import {getShippingQuote} from '../src/libs/shipping';
import {charge} from '../src/libs/payment';

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
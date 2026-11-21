import {it, expect, describe, vi} from 'vitest';
import {getShippingInfo} from '../src/mocking';
import {getShippingQuote} from '../src/libs/shipping';

vi.mock('../src/libs/shipping')


describe('getShippingInfo',()=>{

    it('should return shipping costs and estimated days',()=>{
        vi.mocked(getShippingQuote).mockReturnValue({cost: 5, estimatedDays: 3})
        const result =  getShippingInfo('New York')
        expect(result).toBe('Shipping Cost: $5 (3 Days)')
    })

    it('should return shipping unavailable when quote is null',()=>{
        vi.mocked(getShippingQuote).mockReturnValue(null)
        const restult = getShippingInfo('Mars')
        expect(restult).toMatch(/unavailable/i)
    })
})
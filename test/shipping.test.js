import {describe, it, expect} from 'vitest';
import {getShippingFee} from '../src/libs/shipping';

describe('getShippingFee', () => {
    
    it('throws an error when the order total is negative', () => {
    expect(() => getShippingFee(-1)).toThrow('Order total cannot be negative')
    })

    it('should return 5 when total order is 0',()=>{
        expect(getShippingFee(0)).toBe(5)
    })

    it('should return 0 when total order is 50',()=>{
        expect(getShippingFee(50)).toBe(0)
    })

    it('should return 0 when total order greater than 50',()=>{
        expect(getShippingFee(60)).toBe(0)
    })
})
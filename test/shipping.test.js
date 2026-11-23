import {describe, it, expect} from 'vitest';
import {getShippingFee , getCartSummary} from '../src/libs/shipping';

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

describe('getCartSummary', () => {
    
    it('returns zero item count and subtotal for an empty cart', () => {
    expect(getCartSummary([])).toEqual({ itemCount: 0, subtotal: 0 })
    })

    it('should return empty itemCount and subtotal object when item is 0',()=>{
        expect(getCartSummary([{quantity : 0 , price : 0}])).toEqual({itemCount : 0 , subtotal : 0})
    })

    it('should return 3 itemCount and total 30',()=>{
        expect(getCartSummary([{quantity : 3 , price : 10}])).toEqual({itemCount : 3 , subtotal : 30})
    })

    it('should return 5 itemCount and total 35',()=>{
        expect(getCartSummary([{quantity : 2 , price : 10},{quantity : 3 , price : 5}])).toEqual({itemCount : 5 , subtotal : 35})
    })

    it('returns zero for a product with zero quantity', () => {
    expect(getCartSummary([{ quantity: 0, price: 10 }])).toEqual({itemCount: 0, subtotal: 0})
    })
})
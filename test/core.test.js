import { it, expect, describe } from 'vitest'
import {getCoupons , validateUserInput ,isValidUsername , canDrive ,isPriceInRange} from '../src/core'

describe('Coupons Tests', () => {

    it('should return valid Coupons array',()=>{
        const coupons = getCoupons()

       expect(Array.isArray(coupons)).toBe(true)
       expect(coupons.length).toBeGreaterThan(0)
    })


    it('should return valid cupons code',()=>{
        
        const coupons = getCoupons()

        coupons.forEach(coupon=>{
            
            expect(coupon).toHaveProperty('code')
            expect(typeof coupon.code).toBe('string')
            expect(coupon.code).toBeTruthy()
        })
    })


    it('should return valid cupons discount',()=>{

        const coupons = getCoupons()

        coupons.forEach(couppon=>{
            expect(couppon).toHaveProperty('discount')
            expect(typeof(couppon.discount)).toBe('number')
            expect(couppon.discount).toBeGreaterThan(0)
            expect(couppon.discount).toBeLessThan(1)
        })
    })
})


describe('validateUser test',()=>{

    it('should return Validation successful when inputs are valid' , ()=>{

        expect(validateUserInput('peterpaing',23)).toMatch(/successful/i)
    })

    it('should return error when username is not string',()=>{
        expect(validateUserInput(21,23)).toMatch(/invalid username/i)
    })

    it('should return error when username length less than 3 ',()=>{
        expect(validateUserInput('ab',23)).toMatch(/invalid username/i)
    })

    it('should return error when username length greater than 255 ',()=>{
        expect(validateUserInput('A'.repeat(256),23)).toMatch(/invalid username/i)
    })

    it('should return error when age is not number ',()=>{
        expect(validateUserInput('peterpaing','peterpaing')).toMatch(/invalid age/i)
    })

    it('should return error when age is less than 18 ',()=>{
        expect(validateUserInput('peterpaing',15)).toMatch(/invalid age/i)
    })
    it('should return error when age is greater than 100 ',()=>{
        expect(validateUserInput('peterpaing',101)).toMatch(/invalid age/i)
    })
})

describe('validateUser test',()=>{

   const maxLength = 15
   const minLength = 5

   it('should return true when username length is between 5 and 15',()=>{
      expect(isValidUsername('a'.repeat(minLength))).toBe(true)
      expect(isValidUsername('a'.repeat(maxLength))).toBe(true)
      expect(isValidUsername('a'.repeat(minLength+1))).toBe(true)
      expect(isValidUsername('a'.repeat(maxLength-1))).toBe(true)
    })

    it('should return false when username length is short and long',()=>{
      expect(isValidUsername('a'.repeat(minLength-1))).toBe(false)
      expect(isValidUsername('a'.repeat(maxLength+1))).toBe(false)
    })

    it('should return false when username is invalid',()=>{
      expect(isValidUsername(null)).toBe(false)
      expect(isValidUsername(undefined)).toBe(false)
      expect(isValidUsername(1)).toBe(false)
    })
})

describe('isPriceInRange test', () => {
    it.each([
        { scenario: 'price < min', price: -10, result: false },
        { scenario: 'price > max', price: 150, result: false },
        { scenario: 'price > min', price: 5, result: true },
        { scenario: 'price < max', price: 50, result: true },
        { scenario: 'price = min', price: 0, result: true },
        { scenario: 'price = max', price: 100, result: true },
    ])('should return $result for $scenario', ({ price, result }) => {
        expect(isPriceInRange(price, 0, 100)).toBe(result);
    });
});


describe('canDrive test',()=>{
    it.each([
        {age:15 , countryCode:'US', result:false},
        {age:16 , countryCode:'US', result:true},
        {age:17 , countryCode:'US', result:true},
        {age:16 , countryCode:'UK', result:false},
        {age:17 , countryCode:'UK', result:true},
        {age:18 , countryCode:'UK', result:true},
    ])('should return $result for $age and $countryCode',({age, countryCode, result}) => {
        expect(canDrive(age, countryCode)).toBe(result);
    });
});
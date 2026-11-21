import {describe,test, it, expect} from 'vitest'
import { max,fizzBuzz } from '../src/intro'

describe('max', () => {
    it('should return the first argument if it is greater than the second', () => {
        expect(max(2,1)).toBe(2)
    })

    it('should return the second argument if it is greater than frst',()=>{
        expect(max(1,2)).toBe(2)
    })

    it('should return the first argument if arguments are equal',()=>{
        expect(max(1,1)).toBe(1)
    })
})


describe('fizzBuzz',()=>{
    it('should return FizzBuzz if the argument % 3 and 5',()=>{
        expect(fizzBuzz(15)).toBe('FizzBuzz')
    })

    it('should return Fizz if the argument only % 3',()=>{
        expect(fizzBuzz(3)).toBe('Fizz')
    })

    it('should return Buzz if the argument only % 5',()=>{
        expect(fizzBuzz(5)).toBe('Buzz')
    })

    it('should return string if not the argument % 3 and 5',()=>{
        expect(fizzBuzz(2)).toBe('2')
    })
})
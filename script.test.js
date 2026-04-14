import { describe, it, expect, vi } from 'vitest';
import { getRandomInt, rectIntersect, circleIntersect, timeToString, generateString } from './script.utils.js';

// getRandomInt(-42, 42) < 43 returns true
// getRandomInt(42, 42) returns 42
// rectIntersect(1,1,2,1,4,1,1,2) returns false
// rectIntersect(1,1,5,2,4,1,1,2) returns true
// circleIntersect(3,2,1,6,1,1.5) returns false
// circleIntersect(3,2,1,3,-2,4) returns true
// timeToString(123456789) returns "17:36:78"
// timeToString("toto") returns "NaN:NaN:NaN"

// je crée un faux AudioContext avec une "fausse" fonction, ca m'evite les problemes avec la partie audio
globalThis.AudioContext = vi.fn(() => ({
    createOscillator: vi.fn(() => ({ connect: vi.fn(), frequency: {}, start: vi.fn() })),
    createGain: vi.fn(() => ({ connect: vi.fn(), gain: { value: 0, exponentialRampToValueAtTime: vi.fn() } })),
    currentTime: 0,
    destination: {},
}));

describe('script.js', () => {

    // Test fournis
    it('getRandomInt(-42, 42) < 43', () => expect(getRandomInt(-42, 42) < 43).toBe(true));
    it('getRandomInt(42, 42)', () => expect(getRandomInt(42, 42)).toBe(42));

    it('rectIntersect(1,1,2,1,4,1,1,2)', () => expect(rectIntersect(1,1,2,1,4,1,1,2)).toBe(false));
    it('rectIntersect(1,1,5,2,4,1,1,2)', () => expect(rectIntersect(1,1,5,2,4,1,1,2)).toBe(true));

    it('circleIntersect(3,2,1,6,1,1.5)', () => expect(circleIntersect(3,2,1,6,1,1.5)).toBe(false));
    it('circleIntersect(3,2,1,3,-2,4)', () => expect(circleIntersect(3,2,1,3,-2,4)).toBe(true));

    it('timeToString(123456789)', () => expect(timeToString(123456789)).toBe("17:36:78"));
    it('timeToString("toto")', () => expect(timeToString("toto")).toBe("NaN:NaN:NaN"));


    // Test perso
    it('generateString(5).length = 5', () => expect(generateString(5).length).toBe(5));
    it('generateString(1).length = 1', () => expect(generateString(1).length).toBe(1));
    it('generateString(0) = ""', () => expect(generateString(0)).toBe(""));
    
    it('getRandomInt(10, 30) > 31', () => expect(getRandomInt(10, 30) > 31).toBe(false));
    it('getRandomInt(1, 10) > 0', () => expect(getRandomInt(1, 10) > 0).toBe(true));
})
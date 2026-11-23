import { describe , it ,expect } from "vitest";
import {getJobTitle} from '../src/libs/getJobTitle';

describe('getJobTitle', () => {
    
it('should throw an error when job is not found', async () => {
const loadJob = async () => null;

await expect(getJobTitle(1,loadJob)).rejects.toThrow('Job not found')
});

it('should return job title when id matches with the job', async () => {
    const loadJob = async (id) => ({ id, title: 'Frontend Developer' });

    await expect(getJobTitle(1, loadJob)).resolves.toBe('Frontend Developer');
});

})
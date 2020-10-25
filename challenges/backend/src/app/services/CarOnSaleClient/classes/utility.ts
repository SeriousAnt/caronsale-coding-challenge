import * as crypto from 'crypto';

export class Utility {

    public static hashPasswordWithCycles(password: string, cycles: number): string {
        let hash: crypto.Hash;
        let index = 0;
        while (index < cycles) {
            hash = crypto.createHash('sha512').update(index === 0 ? password : hash.copy().digest('hex'));
            index++;
        }
        return hash.digest('hex');
    }

}
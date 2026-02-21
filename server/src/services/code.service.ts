import { customAlphabet } from 'nanoid';
import { FileModel } from '../models/file.model';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const generateId = customAlphabet(alphabet, 6);

export const generateCode = async (): Promise<string> => {
    let code: string;
    let exists: boolean;

    // Keep generating until we get a unique code
    do {
        code = generateId();
        exists = await FileModel.existsByCode(code);
    } while (exists);

    return code;
};

export const resolveCode = async (code: string) => {
    return FileModel.findByCode(code);
};

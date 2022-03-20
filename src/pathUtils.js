import { existsSync, mkdirSync, rmdirSync } from 'fs';
import { join } from 'path';

export const mkdir = (basePath = '.') => {
    const subPathList = ['img', 'output'];
    subPathList
        .map(p => join(basePath, p))
        .filter(p => !existsSync(p))
        .forEach(p => mkdirSync(p));
};

export const rmdir = (basePath = '.') => {
    const subPathList = ['img'];
    subPathList
        .map(p => join(basePath, p))
        .filter(p => existsSync(p))
        .forEach(p => rmdirSync(p, { recursive: true }));
};

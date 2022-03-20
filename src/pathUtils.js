import { existsSync, mkdirSync, rmdirSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import { MUSIC_EXTENSIONS } from './constants.js';

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

const isMusicExists = path => {
    return readdirSync(path)
        .map(filename => extname(filename).replace('.', ''))
        .some(ext => MUSIC_EXTENSIONS.includes(ext.toLowerCase()));
};

export const getInputDirectory = (basePath = '.') => {
    const subPathList = ['input', ''];
    const musicPath = subPathList.map(p => join(basePath, p)).find(path => existsSync(path) && isMusicExists(path));
    if (!musicPath) {
        throw new Error('No music file exists in input folder');
    }
    return musicPath;
};

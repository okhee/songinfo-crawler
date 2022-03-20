import { existsSync, mkdirSync, rmdirSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import * as cheerio from 'cheerio';
import { MUSIC_EXTENSIONS, HTML_EXTENSIONS } from './constants.js';

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
        .map(filename => extname(filename).replace('.', '').toLowerCase())
        .some(ext => MUSIC_EXTENSIONS.includes(ext));
};

export const getInputDirectory = (basePath = '.') => {
    const subPathList = ['input', ''];
    const musicPath = subPathList.map(p => join(basePath, p)).find(path => existsSync(path) && isMusicExists(path));
    if (!musicPath) {
        throw new Error('No music file exists in input folder');
    }
    return musicPath;
};

const getMusicListHtml = (basePath = '.') => {
    const subPathList = ['input', ''];
    const htmlPath = subPathList
        .map(p => join(basePath, p))
        .filter(p => existsSync(p))
        .flatMap(p => readdirSync(p))
        .find(filename => HTML_EXTENSIONS.includes(extname(filename).replace('.', '').toLowerCase()));
    if (!htmlPath) {
        throw new Error('No music list html exists');
    }
    return htmlPath;
};

const parseMusicListHtml = musicListHtml => {
    const $ = cheerio.load(musicListHtml);
    return $;
};

export const getMusicList = (basePath = '.') => {
    const musicListHtml = getMusicListHtml(basePath);
    const musicList = parseMusicListHtml(musicListHtml);
    return musicList;
};

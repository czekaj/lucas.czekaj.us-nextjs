import fs from 'fs';
import path from 'path';

export function getPostsSlugs(): string[] {
    const directory = path.join(process.cwd(), '/data');
    const files = fs.readdirSync(directory);
    const mdxFileNames = files
        .filter(file => path.extname(file) === '.mdx')
        .map(file => path.basename(file, path.extname(file)));
    return mdxFileNames;
}
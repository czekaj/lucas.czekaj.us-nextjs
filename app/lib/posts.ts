import fs from 'fs';
import path from 'path';
import { PostMetadata, getPostData } from './post';


export function getPostsSlugs(): string[] {
    const directory = path.join(process.cwd(), '/data');
    const files = fs.readdirSync(directory);
    const mdxFileNames = files
        .filter(file => path.extname(file) === '.mdx')
        .map(file => path.basename(file, path.extname(file)));
    return mdxFileNames;
}

export function getPostsMetadata(sortDescending = true): PostMetadata[] {
    let postsMetadata: PostMetadata[] = [];

    getPostsSlugs().forEach(slug => {
        const postData = getPostData(slug);
        postsMetadata.push(postData.metadata);
    });

    if (sortDescending) {
        postsMetadata = postsMetadata.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime();
        });    
    }

    return postsMetadata;
}
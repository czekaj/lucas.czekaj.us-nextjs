const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

export interface PostMetadata {
    title: string;
    date: string;
    formattedDate: string;
    slug: string;
    lastUpdated?: Date;
    draft: boolean;
    summary: string;
}

export const getPostData = (slug: string) => {
    const fullPath = path.join(process.cwd(), "data", slug + ".mdx");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
  
    const metadata: PostMetadata = {
        title: data.title,
        slug: slug,
        date: data.date,
        formattedDate: new Date(data.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          }),        
        draft: data.draft,
        summary: data.summary,
        lastUpdated: fs.statSync(fullPath).mtime,
    };  
    return { metadata: metadata, content: content };
  };

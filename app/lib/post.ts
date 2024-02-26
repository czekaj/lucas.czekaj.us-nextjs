const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

export const getPostData = (slug: string) => {
    const fullPath = path.join(process.cwd(), "data", slug + ".mdx");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
  
    let metadata = data;
    metadata["slug"] = slug;
    metadata["lastUpdated"] = fs.statSync(fullPath).mtime;
  
    return { metadata: metadata, content: content };
  };

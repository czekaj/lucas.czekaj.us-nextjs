const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { execSync } = require('child_process');

export interface PostMetadata {
    title: string;
    date: string;
    formattedDate: string;
    slug: string;
    lastUpdated?: Date;
    formattedLastUpdated?: string;
    draft: boolean;
    summary: string;
}

function getLastModifiedTime(filePath: string): Date | undefined{
    try {
      const command = `git log -1 --format="%ad" -- ${filePath}`;
      const stdout = execSync(command);
      const dateString = stdout.toString().trim();
      const date = new Date(dateString);
  
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return undefined;
      }
  
      return date;
    } catch (error) {
      throw new Error(`Failed to get last modified time: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

function formattedDateTime(date: Date | null) {
    if (!date) {
        return null;
    }
 // Format the date in Pacific Time
 const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  return formatter.format(date);    
}

export const getPostData = (slug: string) => {
    const fullPath = path.join(process.cwd(), "data", slug + ".mdx");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const lastUpdated = getLastModifiedTime(fullPath) || fs.statSync(fullPath).mtime
  
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
        lastUpdated: lastUpdated,
        formattedLastUpdated : formattedDateTime(lastUpdated) || undefined,
    }; 
    return { metadata: metadata, content: content };
  };

import React from 'react';
import fs from 'fs/promises';


import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';
import path from 'path';
import matter from 'gray-matter';


async function Home() {
  async function getPosts() {
    const posts = []
    const filesNames = await fs.readdir(path.join(process.cwd(), "/content"))
    for (const fileName of filesNames) {
      const fileContent = await fs.readFile(path.join(process.cwd(), `/content/${fileName}`), "utf8")
      const {data: summaryData} = matter(fileContent)
      posts.push({
        slug: fileName.replace(".mdx", ""),
        ...summaryData
      })
    }
    posts.sort((p1, p2) => p1.publishedOn < p2.publishedOn ? 1 : -1)
    return posts
  }
  const posts = await getPosts()
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Latest Content:
      </h1>

      {posts.map(post => (
        <BlogSummaryCard
          key={post.slug}
          slug={post.slug}
          title={post.title}
          abstract={post.abstract}
          publishedOn={post.publishedOn}
        />
      ))}

      {/* TODO: Iterate over the data read from the file system! */}
    </div>
  );
}

export default Home;

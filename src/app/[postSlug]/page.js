import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '@/constants';
import CodeSnippet from '@/components/CodeSnippet';
const DivisionGroupsDemo = React.lazy(() => import('@/components/DivisionGroupsDemo'));
const CircularColorsDemo = React.lazy(() => import('@/components/CircularColorsDemo'))


export async function generateMetadata({params}) {
  const postData = await loadBlogPost(params.postSlug)
  return {
    title: `${postData.frontmatter.title} - ${BLOG_TITLE}`,
    description: postData.frontmatter.abstract,

  }
}

async function BlogPost({params}) {
  const postData = await loadBlogPost(params.postSlug)
  

  return (
    
    <article className={styles.wrapper}>
    <BlogHero
        title={postData.frontmatter.title}
        publishedOn={postData.frontmatter.publishedOn}
      />
      
      <div className={styles.page}>
        <MDXRemote source={postData.content} components={{
          pre: CodeSnippet, 
          DivisionGroupsDemo,
          CircularColorsDemo
        }}/>
        
      </div>
    </article>
  );
}

export default BlogPost;

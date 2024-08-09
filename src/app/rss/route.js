import { getBlogPostList, loadBlogPost } from "@/helpers/file-helpers"
import { BLOG_TITLE } from "@/constants"
import RSS from "rss"
import path from "path"

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request) {
    const postsList = await getBlogPostList()
    const feed = new RSS({
        title: BLOG_TITLE,
    description: 'A blog about web dev',
    feed_url: path.join(process.cwd(), '/rss.xml'),
    site_url: process.cwd(),
    })
    for (const post of postsList) {
        const postData = await loadBlogPost(post.slug)
        feed.item({
            title: postData.frontmatter.title,
            description: postData.frontmatter.description,
            url: path.join(process.cwd(), post.slug),
            date: postData.frontmatter.publishedOn,  
        })
    }
    const xml = feed.xml()
    return new Response(xml, {
        headers: {"Content-Type": "application/xml"}
    })
}
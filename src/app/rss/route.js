import { getBlogPostList, loadBlogPost } from "@/helpers/file-helpers"
import { headers } from "next/headers"
import { BLOG_TITLE } from "@/constants"
import RSS from "rss"
import path from "path"

export async function GET(request) {
    const host = request.headers.get("host")
    try {
        const postsList = await getBlogPostList()
        const feed = new RSS({
            title: BLOG_TITLE,
        description: 'A blog about web dev',
        feed_url: path.join(host, '/rss.xml'),
        site_url: host,
        })
        for (const post of postsList) {
            const postData = await loadBlogPost(post.slug)
            feed.item({
                title: postData.frontmatter.title,
                description: postData.frontmatter.description,
                url: path.join(host, post.slug),
                date: postData.frontmatter.publishedOn,  
            })
        }
        const xml = feed.xml()
        return new Response(xml, {
            headers: {"Content-Type": "application/xml"}
        })
    }
    catch(error) {
        return new Response(error, {
            status: error.status
        })
    }
}
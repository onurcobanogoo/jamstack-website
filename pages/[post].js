export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)
    const posts = await res.json()

    const paths = posts.data.map((post) => ({
        params: {post: post.id.toString()},
    }))

    return {paths, fallback: false}
}

export async function getStaticProps({params}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${params.post}`)
    const post = await res.json()

    return {
        props: {
            post,
        },
    }
}

function PostPage({post}) {
    const {title, content} = post.data.attributes

    return (
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
        </div>
    )
}

export default PostPage
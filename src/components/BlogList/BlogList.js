import './BlogList.css'

const BlogList = ({posts, onView}) => {
  const formatDate = date => {
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  }

  return (
    <div className="blog-list">
      <h1 className="main-title">Your Blogs</h1>
      {posts.length === 0 ? (
        <p>There are no Blogs Yet</p>
      ) : (
        posts.map(post => (
          <div
            className="blog-post-card"
            key={post.id}
            onClick={() => onView(post.id)}
            role="button"
            tabIndex="0"
            onKeyPress={e => {
              if (e.key === 'Enter') onView(post.id)
            }}
          >
            <h2>{post.title}</h2>
            <p>By {post.author}</p>
            <p>{post.summary}</p>
            <small>{formatDate(post.publicationDate)}</small>
          </div>
        ))
      )}
    </div>
  )
}

export default BlogList

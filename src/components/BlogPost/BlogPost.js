import './BlogPost.css'

const BlogPost = ({post, onDelete, onEdit, onBack}) => {
  const formatDate = date => {
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  }

  return (
    <div className="blog-post-container">
      <h1>{post.title}</h1>
      <p>By {post.author}</p>
      <p className="post-content">{post.content}</p>
      <small>{formatDate(post.publicationDate)}</small>
      <div className="buttons-container">
        <button type="button" onClick={() => onEdit(post)}>
          Edit
        </button>
        <button type="button" onClick={() => onDelete(post.id)}>
          Delete
        </button>
      </div>
      <button type="button" onClick={onBack}>
        Back
      </button>
    </div>
  )
}

export default BlogPost

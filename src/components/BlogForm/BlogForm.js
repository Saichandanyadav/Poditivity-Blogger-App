import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import './BlogForm.css'

const BlogForm = ({initialData, onSave}) => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    publicationDate: '',
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        author: initialData.author,
        content: initialData.content,
        publicationDate: initialData.publicationDate,
      })
    } else {
      setFormData({
        title: '',
        author: '',
        content: '',
        publicationDate: '',
      })
    }
  }, [initialData])

  const handleSubmit = e => {
    e.preventDefault()
    onSave({
      id: initialData?.id,
      ...formData,
    })
    setFormData({
      title: '',
      author: '',
      content: '',
      publicationDate: '',
    })
    history.push('/')
  }

  const handleChange = e => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <div className="bg-blog-form-container">
      <form className="blog-form-container" onSubmit={handleSubmit}>
        <h1 className="main-heading">Create Your Blog</h1>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          className="inputs-style"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          className="inputs-style"
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          className="inputs-style"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="publicationDate"
          value={formData.publicationDate}
          className="inputs-style"
          onChange={handleChange}
          required
        />
        <button className="custom-button" type="submit">
          {initialData ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  )
}

export default BlogForm

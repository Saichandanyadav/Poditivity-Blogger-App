import {useState, useEffect} from 'react'
import './App.css'
import BlogList from './components/BlogList/BlogList'
import BlogPost from './components/BlogPost/BlogPost'
import BlogForm from './components/BlogForm/BlogForm'

const mockAPI = {
  fetchPosts: () => JSON.parse(localStorage.getItem('posts')) || [],
  savePosts: posts => localStorage.setItem('posts', JSON.stringify(posts)),
}

const App = () => {
  const [posts, setPosts] = useState([])
  const [currentPost, setCurrentPost] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchedPosts = mockAPI.fetchPosts()
    setPosts(fetchedPosts)
  }, [])

  const handleViewPost = id => {
    const post = posts.find(p => p.id === id)
    setCurrentPost(post)
    setIsEditing(false)
  }

  const handleAddPost = post => {
    const newPosts = [...posts, {...post, id: Date.now()}]
    setPosts(newPosts)
    mockAPI.savePosts(newPosts)
  }

  const handleEditPost = updatedPost => {
    const updatedPosts = posts.map(p =>
      p.id === updatedPost.id ? updatedPost : p,
    )
    setPosts(updatedPosts)
    mockAPI.savePosts(updatedPosts)
  }

  const handleDeletePost = id => {
    const updatedPosts = posts.filter(p => p.id !== id)
    setPosts(updatedPosts)
    mockAPI.savePosts(updatedPosts)

    if (currentPost && currentPost.id === id) {
      setCurrentPost(null)
      setIsEditing(false)
    }
  }

  const handleBack = () => {
    setCurrentPost(null)
    setIsEditing(false)
  }

  return (
    <div className="app-container">
      <div className="brand-bg-container">
        <h1 className="main-heading-title">Prodivity Blogger</h1>
        <div>
          <img
            src="https://i.pinimg.com/736x/fa/40/76/fa40760e7d157ddcf5d451d3471ff02c.jpg"
            alt="brand icon"
            className="brand-icon"
          />
        </div>
      </div>
      <div className="container">
        {(isEditing || currentPost === null) && (
          <BlogForm
            initialData={currentPost}
            onSave={post => {
              if (currentPost) {
                handleEditPost(post)
              } else {
                handleAddPost(post)
              }
              setCurrentPost(null)
              setIsEditing(false)
            }}
          />
        )}
        {!currentPost && !isEditing && (
          <BlogList posts={posts} onView={handleViewPost} />
        )}

        {currentPost && !isEditing && (
          <BlogPost
            post={currentPost}
            onDelete={handleDeletePost}
            onEdit={post => {
              setCurrentPost(post)
              setIsEditing(true)
            }}
            onBack={handleBack}
          />
        )}
      </div>
      <a
        href="https://www.linkedin.com/in/saichandanyadav/"
        rel="noreferrer"
        target="_blank"
        className="developer"
      >
        Follow the Developer
      </a>
    </div>
  )
}

export default App

import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import PT from 'prop-types'

export default function Articles(props) {
  // ✨ where are my props? Destructure them here
  const { getArticles, articles, deleteArticle, setCurrentArticleId, setCurrentArticle } = props;

  // ✨ implement conditional logic: if no token exists
  // we should render a Navigate to login screen (React Router v.6)
  if (!localStorage.getItem('token')) {
    return(
      <Navigate to='/' />
    );
  }

  useEffect(() => {
    // ✨ grab the articles here, on first render only
    getArticles();
  }, [])

  const onClick = (e) => {
    const name = e.target.className;
    if (name == 'delete') {
      deleteArticle(e.target.id);
    }
    if (name == 'edit') {
      setCurrentArticleId(e.target.id);
      const articleToEdit = articles.find(article => article.article_id === Number(e.target.id));
      if (articleToEdit) {
        setCurrentArticle(articleToEdit);
      }
    }
  }

  return (
    // ✨ fix the JSX: replace `Function.prototype` with actual functions
    // and use the articles prop to generate articles
    <div className="articles">
      <h2>Articles</h2>
      {
        !articles.length
          ? 'No articles yet'
          : articles.map(art => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Topic: {art.topic}</p>
                </div>
                <div>
                  <button id={art.article_id} className='edit' disabled={false} onClick={onClick}>Edit</button>
                  <button id={art.article_id} className='delete' disabled={false} onClick={onClick}>Delete</button>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

// 🔥 No touchy: Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // the array can be empty
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // can be undefined or null
}

import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { jsonApi } from '../../axios'

function ScrollPagination() {
  const [comments, setComments] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef(null)

  useEffect(() => {
    jsonApi.get(`comments?_page=${currentPage}&_limit=10`)
      .then(response => {
        if (response.status == 200) {
          setComments((prevComments) => [...prevComments, ...response.data]);
          const total = response.headers['x-total-count']
          const totalPages = Math.ceil(total / 10)

          if (currentPage >= totalPages) {
            setHasMore(false)
          }
        }
      })
      .catch(error => {
        console.log(error);
      })
  }, [currentPage])

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && hasMore) {
          setCurrentPage(prevPage => prevPage + 1)
        }
      },
      {threshold: 1}
    )

    const currentLoader = loaderRef.current
    if (currentLoader) {
      observer.observe(currentLoader)
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
    }
  }, [hasMore])

  return (
    <div className='container-pagination'>
      <h2 className='title'>Comments</h2>
      <div className="cards">
        {
          comments.length > 0 && comments.map((comment, index) => (
            <div key={index} className="card">
              <p><strong>Id:</strong>{" "} {comment.id}</p>
              <p><strong>Name:</strong>{" "} {comment.name}</p>
              <p><strong>Email:</strong>{" "} {comment.email}</p>
              <p><strong>Body:</strong>{" "} {comment.body}</p>
              <p><strong>Post Id:</strong>{" "} {comment.postId}</p>
            </div>
          ))
        }
      </div>
      {
        hasMore && (
          <div ref={loaderRef} className='loader'>
            Loading more comments...
          </div>
        )
      }
    </div>
  )
}

export default ScrollPagination

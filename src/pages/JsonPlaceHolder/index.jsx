import React, { useEffect, useState } from 'react'
import './index.css'
import { jsonApi } from '../../axios'
import Pagination from '@mui/material/Pagination';
import { useSearchParams } from 'react-router-dom';

function JsonPlaceHolder() {
    const [comments, setComments] = useState([])
    const [pageCount, setPageCount] = useState(84)
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 6

    useEffect(() => {
        jsonApi.get(`comments?_page=${currentPage}&_limit=${limit}`)
            .then(response => {
                if (response.status == 200) {
                    setComments(response.data)
                    const total = response.headers['x-total-count']
                    setPageCount(Math.ceil(total / limit))
                }
            })
            .catch(error => {
                console.log(error);
            })
    }, [currentPage, limit])

    function handleChangeCount(event, page) {
        setSearchParams({page, limit})
    }

    function handleChangeLimit(event) {
        setSearchParams({page: 1, limit: event.target.value})
    }

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
            <div className="pagination">
                <Pagination onChange={handleChangeCount} className='pagination-counter' count={pageCount} size='large' boundaryCount={2} variant="outlined" shape="rounded" />
                <select value={limit} onChange={handleChangeLimit} className="select">
                    <option value="6">6</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="60">60</option>
                    <option value="70">70</option>
                    <option value="80">80</option>
                    <option value="90">90</option>
                    <option value="100">100</option>
                </select>
            </div>
        </div>
    )
}

export default JsonPlaceHolder
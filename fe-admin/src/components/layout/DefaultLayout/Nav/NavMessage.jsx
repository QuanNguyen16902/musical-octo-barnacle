import React from 'react'
import "./nav.css"
function NavMessage() {
  return (
    <li className='nav-item dropdown'>
        <a className="nav-link nav-icon" href='#' data-bs-toggle="dropdown">
          <i className='bi bi-chat-left-text'></i>
          <span className='badge bg-success badge-number'>3</span>
        </a>
        <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow messages'>
            <li className='dropdown-header'>
              You have 3 new messages
              <a href="#">
                <span className='badge rounded-pill bg-primary p-2 ms-2'>
                    View all
                </span>
              </a>
            </li>
            <li>
              <hr className='dropdown-divider'/>
            </li>

            <li className='message-item'>
              You have 3 new messages
              <a href="#">
                <img src='#' alt='' className='rounded-circle'/>
                <div>
                  <h4>Maria Hudson</h4>
                  <p>TÔi chưa đến nơi</p>
                  <p>4 giờ trước</p>
                </div>
              </a>
            </li>
            <li>
              <hr className='dropdown-divider'/>
            </li>

            
            <li className='message-item'>
              You have 3 new messages
              <a href="#">
                <img src='#' alt='' className='rounded-circle'/>
                <div>
                  <h4>Maria Hudson</h4>
                  <p>TÔi chưa đến nơi</p>
                  <p>4 giờ trước</p>
                </div>
              </a>
            </li>
            <li>
              <hr className='dropdown-divider'/>
            </li>
            <li className="dropdown-footer"><a href="#">Show all notification</a></li>
    
        </ul>
  
    </li>
    )
}

export default NavMessage
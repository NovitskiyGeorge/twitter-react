import React from 'react';
import PostListItem from '../post-list-item';
import { ListGroup } from 'reactstrap';
import './post-list.css';

const PostList = ({ posts, onDelete, onToggleStatus }) => {
   const elements = [];

   posts.forEach((item) => {
      if (typeof item !== 'object') {
         return;
      }
      const { id, ...itemProps } = item;
      elements.push(
         <li key={id} className='list-group-item'>
            <PostListItem
               {...itemProps}
               onDelete={() => onDelete(id)}
               onToggleImportant={() => onToggleStatus('important', id)}
               onToggleLiked={() => onToggleStatus('like', id)}
            />
         </li>
      )

   })

   return (
      <ListGroup className="app-list">
         {elements}
      </ListGroup>
   )
}

export default PostList;
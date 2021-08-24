import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
display: flex;
align-items: flex-end;
justify-content: space-between;
h1 {
  font-size: 26px;
}
h2 {
   font-size: 1.2rem;
   color: #008080;
}
`

const AppHeader = ({ liked, allPosts }) => {
   return (
      <Header>
         <h1>George Novitskiy</h1>
         <h2>{allPosts} записей, из них понравилось {liked}</h2>
      </Header>
   )
}

export default AppHeader;
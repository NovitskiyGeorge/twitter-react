import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import './app.css';
import styled from 'styled-components';

const AppBlock = styled.div`
   margin: 0 auto;
   max-width: 800px;
`

export default class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: [
            { label: "Going to learn React", important: true, like: false, id: 'ssaddfdg' },
            { label: "That is so good", important: false, like: false, id: 'gregerde' },
            { label: "I need a break...", important: false, like: false, id: 'dedfwsvv' }
         ],
         term: '',
         filter: 'all'
      };
      this.deleteItem = this.deleteItem.bind(this);
      this.addItem = this.addItem.bind(this);
      this.onToggleImportant = this.onToggleImportant.bind(this);
      this.onToggleLiked = this.onToggleLiked.bind(this);
      this.onUpdateSearch = this.onUpdateSearch.bind(this);
      this.onFilterSelect = this.onFilterSelect.bind(this);
      this.id = '';
   }

   deleteItem(id) {
      this.setState(({ data }) => {
         const index = data.findIndex(elem => elem.id === id);
         const newArr = [...data.slice(0, index), ...data.slice(index + 1)]
         return {
            data: newArr
         };
      })
   }

   addItem(body) {
      const newItem = {
         label: body,
         important: false,
         id: this.idGenerate()
      }

      this.setState(({ data }) => {
         const newArr = [...data, newItem];
         return {
            data: newArr
         }
      })
   }

   idGenerate() {
      const listSymbol = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
         'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

      this.id = '';

      for (let i = 0; i < 8; i++) {
         const randomNumber = Math.floor(Math.random() * 36);
         this.id += listSymbol[randomNumber];
      }

      return this.id;
   }

   onToggleImportant(id) {
      this.setState(({ data }) => {
         const index = data.findIndex(elem => elem.id === id);

         const old = data[index];
         const newItem = { ...old, important: !old.important };

         const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

         return {
            data: newArr
         }
      })
   }

   onToggleLiked(id) {
      this.setState(({ data }) => {
         const index = data.findIndex(elem => elem.id === id);

         const old = data[index];
         const newItem = { ...old, like: !old.like };

         const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

         return {
            data: newArr
         }
      })
   }



   searchPost(items, term) {
      if (term.length === 0) {
         return items
      }

      return items.filter((item) => {
         return item.label.indexOf(term) > -1
      });
   }

   filterPost(items, filter) {
      if (filter === 'like') {
         return items.filter(item => item.like)
      } else {
         return items
      }
   }

   onUpdateSearch(term) {
      this.setState({ term })
   }

   onFilterSelect(filter) {
      this.setState({ filter })
   }

   render() {
      const { data, term, filter } = this.state;
      const liked = data.filter(item => item.like).length;
      const allPosts = data.length;

      const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

      return (
         <AppBlock>
            <AppHeader
               liked={liked}
               allPosts={allPosts}
            />
            <div className="search-panel d-flex">
               <SearchPanel
                  onUpdateSearch={this.onUpdateSearch} />
               <PostStatusFilter
                  filter={filter}
                  onFilterSelect={this.onFilterSelect} />
            </div>
            <PostList
               posts={visiblePosts}
               onDelete={this.deleteItem}
               onToggleImportant={this.onToggleImportant}
               onToggleLiked={this.onToggleLiked}
            />
            <PostAddForm
               onAdd={this.addItem} />
         </AppBlock >
      );
   }
}

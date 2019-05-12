import React, { Component } from 'react';
import axios from '../../../axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

import './Posts.css';
    
class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount = () => {
        console.log('Posts.js componentDidMount: this.props', this.props);
        axios.get('/posts')
            .then(response => {
                console.log('Posts.js then: ', response);
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Deepak'
                    }
                });
                this.setState({posts: updatedPosts});
                //console.log(response);
            })
            .catch(error => {
                console.log('Posts.js catch: ', error);
                //this.setState({error: true});
                //console.log(error);
            });
    };

    postSelectedHandler = (id) => {
        this.props.history.push('/posts/' + id);
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went Wrong!!!</p>;
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return (
                    //<Link to={'/posts' + post.id} key={post.id}>
                        <Post
                        key={post.id}
                        title={post.title}
                        author={post.author} 
                        clicked={() => this.postSelectedHandler(post.id)}/>
                    //</Link>
                    );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
        );
    }
};
    
export default Posts;
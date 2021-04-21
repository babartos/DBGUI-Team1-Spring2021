import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


//import { Login } from "./pages/login";
import { Posts } from "./pages/posts";
import { PostList } from './pages/postList';

const rootElement = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
      <PostList />
    </React.StrictMode>,
    document.getElementById('root')
  );

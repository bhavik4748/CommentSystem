import React from 'react';
import './App.css';
import { CommentArray } from './commentArray';

function Comment({ val, child, id, onSubmitHandler }) {
  function localSubmitHandler(event) {
    event.preventDefault();
    onSubmitHandler(event, id);
  }

  let childComp = null;
  childComp = child.map(c => {
    return (
      <div key={c.id} >
        <Comment key={c.id} id={c.id} val={c.val} child={c.child} onSubmitHandler={onSubmitHandler} />
      </div>
    )
  })
  return (
    <div className='commentDiv'>
      <form className='commentparent' onSubmit={localSubmitHandler}>
        <div>{val}</div>
        <button>reply </button>
      </form>
      <div className='childContainer'>
        {childComp}
      </div>
    </div>
  );
}

function App() {
  let comments = null;
  const [commentState, setCommentState] = React.useState([...CommentArray]);

  function submitHandler(event, id, val) {
    event.preventDefault();
    console.log('clicked', id);
    AddComment(id, 'test');
  }

  function AddComment(id, val) {
    let newC = [...commentState];
    for (let i = 0; i < newC.length; i++) {
      if (newC[i].id == id) {
        newC[i].child.push({ 'id': i * 10, 'val': val, 'child': [] });
        setCommentState(newC);
      }

    }
  }

  comments = (commentState.map(c => {
    return (
      <div>
        <Comment key={c.id} id={c.id} val={c.val} child={c.child} onSubmitHandler={submitHandler} />
      </div>
    )
  }));
  return (
    <div>
      {comments}
    </div>
  );
}

export default App;
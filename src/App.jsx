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
  const [idCounter, setIdCounter] = React.useState(5);

  function submitHandler(event, id, val) {
    event.preventDefault();
    console.log('clicked', id);
    AddComment(id, 'test',[...commentState]);
  }

  function AddComment(id, val, newC) {    
    for (let i = 0; i < newC.length; i++) {
      if (newC[i].id == id) {
        newC[i].child.push({ 'id': idCounter, 'val': val, 'child': [] });        
        setIdCounter(idCounter + 1);
      }else if(newC[i].child.length > 0){
        AddComment(id, 'test', [...newC[i].child]);
      }
    }
    setCommentState(newC);
  }

  comments = (commentState.map(c => {
    return (
      <div key={c.id}>
        <Comment  id={c.id} val={c.val} child={c.child} onSubmitHandler={submitHandler} />
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
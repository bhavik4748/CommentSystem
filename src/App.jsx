import React from 'react';
import './App.css';
import { CommentArray } from './commentArray';

function Comment({ val, child, id, onSubmitHandler }) {
  const [showTextArea, setShowTextArea]=React.useState(false);
  function localSubmitHandler(event) {
    event.preventDefault();
    let textVal = event.target.firstChild.value;  
     setShowTextArea(false);
    onSubmitHandler(event, id, textVal);    
  }

  function buttonHandler(event){
    event.preventDefault();
    setShowTextArea(true);
  }

  let childComp = null;
  childComp = child.map(c => {
    return (
      <div key={c.id} >
        <Comment key={c.id} id={c.id} val={c.val} child={c.child} onSubmitHandler={onSubmitHandler} />
      </div>
    )
  })

  let textArea = null;
  if(showTextArea)
  textArea= ( <form  className="textarea" onSubmit={localSubmitHandler}>
        <textarea ></textarea> <button>Submit</button>
      </form>)

  return (
    <div className='commentDiv'>
      <div className='commentparent'>
        <div>{val}</div>
        <button onClick={buttonHandler}>reply </button>
      </div>
      <div className='childContainer'>
        {childComp}
      </div>
     {textArea}
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
    AddComment(id, val, [...commentState]);
  }

  function AddComment(id, val, newC) {
    for (let i = 0; i < newC.length; i++) {
      if (newC[i].id == id) {
        newC[i].child.push({ 'id': idCounter, 'val': val, 'child': [] });
        setIdCounter(idCounter + 1);
      } else if (newC[i].child.length > 0) {
        AddComment(id, val, [...newC[i].child]);
      }
    }
    setCommentState(newC);
  }

  comments = (commentState.map(c => {
    return (
      <div key={c.id}>
        <Comment id={c.id} val={c.val} child={c.child} onSubmitHandler={submitHandler} />
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
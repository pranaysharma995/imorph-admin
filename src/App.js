import React,{useState} from 'react';
import './App.css';
import './css/style.css'
import CustomButton from './components/customButton'
import CustomTextfield from './components/customTextfield'

const App=()=> {

  const click = () => {
    alert();
  }

  const [text , setText] = useState('')


  return (
    <div className="App">
      <CustomButton customButton__class="btn" handleClick={click} text="demo" icon={<i className="fa fa-print app__fa" aria-hidden="true"></i>}/>
      <br/>
      <CustomTextfield customTextfield__input="app__input" type="text" placeholder="enter Text" value={text} handleChange={e=> setText(e.target.value)}/>
    </div>
  );
}

export default App;

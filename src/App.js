import React,{useState} from 'react';
import './App.css';
import './css/style.css'
import CustomButton from './components/customButton'
import CustomTextfield from './components/customTextfield'
import CustomTable from './components/customTable'
import profile from './assets/profile.png'

const App=()=> {

  const click = () => {
    alert();
  }

  const [text , setText] = useState('')
  const tableHeaderText = ["Photo","Name & Email","Conversions","Contact","Subscriptions","Status","Action"];
  const data = [
    {
      photo : profile,
      name : 'Rahul',
      email : 'rahul@gmail.com',
      conversions : "300",
      contact : "723732673",
      subscriptions : "7 days , $1/mo",
      status : "active"
    },
    {
      photo : profile,
      name : 'Rajat',
      email : 'rajat@gmail.com',
      conversions : "600",
      contact : "86465745445",
      subscriptions : "8 days , $1/mo",
      status : "pending"
    },
    {
      photo : profile,
      name : 'Rajat',
      email : 'rajat@gmail.com',
      conversions : "600",
      contact : "86465745445",
      subscriptions : "8 days , $1/mo",
      status : "pending"
    },

  ]


  return (
    <div className="App">
      <CustomButton customButton__class="btnn" handleClick={click} text="demo" icon={<i className="fa fa-print app__fa" aria-hidden="true"></i>} type="button"/>
      <br/>
      <CustomTextfield customTextfield__input="app__input" type="text" placeholder="enter Text" value={text} handleChange={e=> setText(e.target.value)}/>
      <br/>
        <CustomTable tableClass="table table-striped app__tableClass" table__header="app__tableHeader d-flex justify-content-between" tableHeaderText={tableHeaderText} data={data}/>
   
    </div>
  );
}

export default App;

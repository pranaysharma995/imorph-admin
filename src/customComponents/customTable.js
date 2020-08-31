import React,{useContext, useState,useEffect} from 'react'
import CustomButton from './customButton'
import '../css/style.css'
import CustomTextfield from './customTextfield'
import UserDetailsContext from '../context/user/userDetailsContext'
import {useHistory} from 'react-router-dom'

const CustomTable = ({tableClass , tableHeaderText , userData , results,searchValue ,onHandleChange ,uri})=> {

    const context = useContext(UserDetailsContext);
    const history = useHistory();
    const [data , setData] = useState([]);

    useEffect(() => {
       setData(userData)
    }, [])

    const viewBtnClick = (e , info) => {
        e.preventDefault();        
         context.setUserDetails(info)
         history.push(uri)
    }

    const deleteUser = (e, info)=> {
        e.preventDefault();
       setData(data.filter(user => user.id != info.id));
        
    }

    return (
        <div className="customTable" style={{marginTop: "120px" , marginLeft : "60px" , marginBottom : "90px"}}>
               <div className="d-flex justify-content-between users__tableHeader">
                          <div>
                              <h5 style={{marginTop : "10px" , color : "lightgray" , marginLeft : "10px"}}>Users</h5>
                          </div> 
                           <div style={{position : "relative" ,marginTop : "2px"}}>
                                 <CustomTextfield customTextfield__input="form-control customTable__input" type="text" placeholder="Search" icon_class="fa fa-search customTable__searchIcon" value={searchValue} handleChange={onHandleChange}/>
                           </div>        
                           <div style={{marginTop : "3px"}}>
                                <select name="device" className="customTable__select">
                                    <option value="iOS User">iOS User</option>
                                </select>
                                <select name="subscription" className="customTable__select">
                                    <option value="iOS User">Subscription</option>
                                </select>
                                <select name="days" className="customTable__select">
                                    <option value="iOS User">7 days left</option>
                                </select>
                           </div>                 
                </div>
                <div className="customTable__results">
                    <p>Showing Results : {" " +results}</p>
                </div>

                <div style={{overflowX : 'auto'}}>
                    <table className={tableClass}>
                            
                            <thead>                        
                            <tr >
                                {tableHeaderText.map( (text,i)=> (
                                    <th key={i}><h6 style={{marginTop : "8px"}}>{text}</h6></th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                                    {data.map( (info, i)=> (

                                        

                                        <tr  key={i}>
                                
                                        <td><img width="70rem" className= "rounded-circle p-2" src={info.photo} alt="photo"/></td>
                                        <td >
                                            <div className="text-left">
                                                <h6 style={{marginTop : "8px"}}>{info.fname}&#x20;{info.lname}</h6>
                                                <p>{info.email}</p>
                                            </div>
                                        </td>
                                        <td>{info.conversions}</td>
                                        <td>{info.contact}</td>
                                        <td>{info.subscriptions}</td>
                                        <td>{info.status}</td>
                                        <td>
                                            <div className="d-flex">
                                            <CustomButton customButton__class="customTable__delete" icon={<i className="fa fa-ban" aria-hidden="true"></i>} handleClick={(e) => deleteUser(e ,info)}/>
                                            <CustomButton customButton__class="customTable__edit" handleClick={(e) => viewBtnClick(e ,info)} icon={<i className="fa fa-eye" aria-hidden="true"></i>}/>                                            
                                            </div>
                                        </td>
                                    </tr>
                                    ))}
                    
                            
                            </tbody>
                            
                        </table>                    
                </div>
                <div className="customTable__footer">
                </div>
         </div>
    )
}

export default CustomTable

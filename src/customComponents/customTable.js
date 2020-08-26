import React from 'react'
import CustomButton from './customButton'
import '../css/style.css'
import CustomTextfield from './customTextfield'

const CustomTable = ({tableClass , table__header, tableHeaderText , data})=> {
    return (
        <div>
               <div className={table__header}>
                          <div>
                              User
                          </div> 
                          <div className="d-flex">
                                <CustomTextfield customTextfield__input="customTable__input" type="text" placeholder="search"/>
                                <div className="input-group-append">
                                    <CustomButton customButton__class="btn btn-outline-secondary" type="submit" icon={<i className="fa fa-search" aria-hidden="true"></i>}/>
                                </div>
                          </div>
                </div>

                <div style={{overflowX : 'auto'}}>
                    <table className={tableClass}>
                            
                            <thead>                        
                            <tr>
                                {tableHeaderText.map( (text,i)=> (
                                    <th key={i}>{text}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                                    {data.map( (info, i)=> (

                                        

                                        <tr key={i}>
                                
                                        <td><img width="50rem" className= "rounded-circle" src={info.photo} alt="photo"/></td>
                                        <td>
                                            <div className="text-left">
                                                <h6>{info.name}</h6>
                                                <p>{info.email}</p>
                                            </div>
                                        </td>
                                        <td>{info.conversions}</td>
                                        <td>{info.contact}</td>
                                        <td>{info.subscriptions}</td>
                                        <td>{info.status}</td>
                                        <td>
                                            <div className="d-flex">
                                            <CustomButton customButton__class="customTable__edit" icon={<i className="fa fa-pencil" aria-hidden="true"></i>}/>
                                            <CustomButton customButton__class="customTable__delete" icon={<i className="fa fa-trash-o" aria-hidden="true"></i>}/>
                                            </div>
                                        </td>
                                    </tr>
                                    ))}
                    
                            
                            </tbody>
                            
                        </table>                    
                </div>
                <div>
                        <CustomButton customButton__class="customTable__footer" text="See More" />
                </div>
         </div>
    )
}

export default CustomTable

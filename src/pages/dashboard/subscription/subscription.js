import React,{useEffect,useState} from 'react'
import CustomButton from '../../../customComponents/customButton'
import axiosInstance from '../../../axios'
import {useHistory} from 'react-router-dom'

const Subscription = ({plan}) => {

     const [loading , setLoading] = useState(false)
     const [list , setList] = useState([])
     const history = useHistory();

    useEffect(() => {
       setLoading(true);
    
    axiosInstance.get("/admin/subscription/list" ).then(({data}) => {
       
        setLoading(false);
        setList(data.data)
    }).catch(error => console.log("Error in Subscription List Fetch" , error))
    }, [])


    return (
        <div className="subscription">
            {loading ? <div className="container text-center" style={{marginTop: "400px" , marginBottom : "50%"}}>   
                <div   className="spinner-border text-primary"></div>
            </div> : 
            <>
            <div className="d-flex justify-content-end">                    
                    <button className="subscription__add-btn" style={{position : 'relative'}} onClick={() => history.push('/dashboard/subscription/create')}>
                           Create New
                    </button>
            </div>
           <div className="d-flex justify-content-between users__tableHeader">
                          <div>
                              <h5 style={{marginTop : "10px" , color : "#707070" , marginLeft : "10px" , paddingLeft : "10px"}}>Subscription Plan</h5>
                          </div> 
                                            
            </div>

            
            <div className="subscription__body" style={{overflowX : 'auto',height: "600px"}}>
                    <table className="subscription__table table-striped">
                            
                            <thead>                        
                            <tr>
                                <th>#</th>
                                <th><h5>Subscription Plan</h5></th>
                                <th><h5>Status</h5></th>
                                <th><h5>Action</h5></th>
                            </tr>
                            </thead>
                            <tbody>                                        

                                {list && Object.entries(list).map( (item , i )=> (
                                    <tr key={i}>
                                    <td>#{i+1}</td>

                                    <td>{item[1].name} {item[1].cost}</td>
                                    <td className= {item[1].status ? "customTable__statusActive"  : "customTable__statusInactive" }>{item[1].status ? "Active" : "Inactive"}</td>
                                    <td>
                                        <div className="d-flex">
                                        <CustomButton customButton__class="subscription__edit-btn" icon={<i className="fa fa-pencil" aria-hidden="true"></i>}  handleClick={() =>{ 
                                             history.push("/dashboard/subscription/edit");
                                             plan(item[1])
                                        }}/>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                                    
                                   
                            
                            </tbody>
                            
                        </table>                    
                </div>
                <div className="subscription__footer p-4">
                                                                   
                </div>
            </>}
        </div>
    )
}

export default Subscription

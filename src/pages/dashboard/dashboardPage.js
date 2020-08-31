import React from 'react'
import CustomBar from '../../customComponents/customBar'

function DashboardPage() {
    const graphData = {
     label : ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "June" , "July" , "Aug","Sep","Oct","Nov","Dec"],
     dataSetData : [100, 155, 400, 200, 300 , 222 , 121 , 333, 455, 589 ,211 , 131],
     totaluser : 121
  }
    return (
        <div className=" container-fluid dashboard" style={{marginTop: "120px"}}>
            <div>
                <div className="row text-center mb-3" style={{marginLeft : "-30px" , marginRight : "-30px"}}>
                    <div className="col-md-4">
                        <div className="dashboard__firstGraph p-4" style={{position : "relative"}}>
                                <i className="fa fa-user-o dashboard__icon fa-lg" aria-hidden="true" style={{color : "#1BCA9B"}}></i>
                                <p style={{lineHeight :"0.4" , color : "#707070"}}><small>Users</small></p>
                                <h5 style={{lineHeight :"0.3" , color : "#707070"}}>121</h5>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="dashboard__firstGraph p-4" style={{position : "relative"}}>
                                <i className="fa fa-cube dashboard__icon fa-lg" aria-hidden="true" style={{color : "#EC4849"}}></i>
                                <p style={{lineHeight :"0.4" , color : "#707070"}}><small>Conversions</small></p>
                                <h5 style={{lineHeight :"0.3" , color : "#707070"}}>21312</h5>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="dashboard__firstGraph p-4" style={{position : "relative"}}>
                                <i className="fa fa-user-o dashboard__icon fa-lg" aria-hidden="true" style={{color : "#3498DB"}}></i>
                                <p style={{lineHeight :"0.4" , color : "#707070"}}><small>Subscriptions</small></p>
                                <h5 style={{lineHeight :"0.3" , color : "#707070"}}>121</h5>
                        </div>
                    </div>
                </div>
            </div>
           <div className="row dashboard__firstGraph">
               <div className="col-md-12">
                   <CustomBar backColor="#1BCA9B"  chartHeight="80px" labels={graphData.label} dataSet_data={graphData.dataSetData}  totalNumber={graphData.totaluser}  headerLabel="Total Users"/>
               </div>
           </div>
           <div className="row justify-content-between mt-4">
               <div className="col dashboard__firstGraph" style={{marginRight: "30px"}}>
                     <CustomBar backColor="#EC4849" labels={graphData.label} dataSet_data={graphData.dataSetData}  totalNumber={graphData.totaluser}  headerLabel="Total Users"/>
               </div>
               <div className="col dashboard__firstGraph">
                     <CustomBar backColor="#3498DB" labels={graphData.label} dataSet_data={graphData.dataSetData}  totalNumber={graphData.totaluser}  headerLabel="Total Users"/>
               </div>
           </div>
        </div>
    )
}

export default DashboardPage

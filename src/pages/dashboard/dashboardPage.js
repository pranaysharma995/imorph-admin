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
            <div >
                <div className="row text-center mb-3" style={{marginLeft : "-30px" , marginRight : "-30px"}}>
                    <div className="col-md-4">
                        <div className="dashboard__firstGraph p-4" style={{position : "relative"}}>
                                <i className="fa fa-user-o dashboard__icon fa-lg" aria-hidden="true" style={{color : "#1BCA9B"}}></i>
                                <p style={{lineHeight :"0.4" , color : "#595959"}}><small>Users</small></p>
                                <h3 style={{lineHeight :"0.3" , color : "#595959"}}><strong>332</strong></h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="dashboard__firstGraph p-4" style={{position : "relative"}}>
                                <i className="fa fa-cube dashboard__icon fa-lg" aria-hidden="true" style={{color : "#EC4849"}}></i>
                                <p style={{lineHeight :"0.4" , color : "#595959"}}><small>Conversions</small></p>
                                <h3 style={{lineHeight :"0.3" , color : "#595959"}}><strong>13232</strong></h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="dashboard__firstGraph p-4" style={{position : "relative"}}>
                                <i className="fa fa-user-o dashboard__icon fa-lg" aria-hidden="true" style={{color : "#3498DB"}}></i>
                                <p style={{lineHeight :"0.4" , color : "#595959"}}><small>Subscriptions</small></p>
                                <h3 style={{lineHeight :"0.3" , color : "#595959"}}><strong>1352</strong></h3>
                        </div>
                    </div>
                </div>
            </div>
           <div className="row mt-4 dashboard__firstGraph">
               <div className="col-md-12">
                   <CustomBar barThikness="30" id1="bt1" id2="bt2" id3="bt3" backColor="rgba(96, 177, 255)"  chartHeight="80px" labels={graphData.label} dataSet_data={graphData.dataSetData}  totalNumber={graphData.totaluser}  headerLabel="Total Users"/>
               </div>
           </div>
           <div className="row justify-content-between mt-4">
               <div className="col-md-6 mb-3 " >
                   <div className="row" style={{margin : "0px" , marginLeft : "0px" , marginRight :"0px" }}>
                       <div className="col-md-12 dashboard__firstGraph">
                            <CustomBar barThikness="19" id1="bt4" id2="bt5" id3="bt6" backColor="rgb(64, 230, 242)" labels={graphData.label} dataSet_data={graphData.dataSetData}  totalNumber={graphData.totaluser}  headerLabel="Total Users"/>
                       </div>
                   </div>
                     
               </div>
               <div className="col-md-6 mb-3">
                   <div className="row" style={{margin : "0px" , marginLeft : "0px" , marginRight :"0px" }}>
                       <div className="col-md-12 dashboard__firstGraph" >
                            <CustomBar barThikness="10" id1="bt7" id2="bt8" id3="bt9" backColor="rgb(104, 217, 119)" labels={graphData.label} dataSet_data={graphData.dataSetData}  totalNumber={graphData.totaluser}  headerLabel="Total Users"/>
                       </div>
                   </div>
                     
               </div>
           </div>
        </div>
    )
}

export default DashboardPage

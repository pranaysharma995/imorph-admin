import React,{useState , useEffect} from 'react'
import CustomBar from '../../customComponents/customBar'

function DashboardPage() {

    const [userToggle ,  setUserToggle] = useState({
        year : false,
        week : false , 
        day : false
    })

    const [conversionToggle , setConversionToggle] = useState({
        year : false,
        week : false , 
        day : false
    })

    const [subscriptionToggle , setSubscriptionToggle] = useState({
        year : false,
        week : false , 
        day : false
    })
    const [loading , setLoading] = useState(false)

    useEffect(() => {
       setLoading(true);
       setTimeout(() => {
           setLoading(false)
       }, 1000);
    }, [])

    const graphData = {
     year : {
        label : ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "June" , "July" , "Aug","Sep","Oct","Nov","Dec"],
        dataSetData : [100, 155, 400, 200, 300 , 222 , 121 , 333, 455, 589 ,211 , 131],
        totaluser : 12112
     },
     weeks : {
        label : ["w1" , "w2" , "w3" , "w4"],
        dataSetData : [10, 15, 40, 20],
        totaluser : 1212 
     },
     days : {
        label : ["Sun" , "Mon" , "Tue" , "Wed" , "Thu" , "Fri" , "Sat"],
        dataSetData : [10, 15, 40, 20, 30 , 22 , 12 ],
        totaluser :122
     }
  }

  // User Toggle
  const userYear= e => {
        setUserToggle({
            year : true
        })
  }
  const userWeek = e=> {
    setUserToggle({
        week : true
    })
  }
  const userDay =e=> {
    setUserToggle({
        day : true
    })
  }

  //Conversion toggle
  const conversionYear= e => {
    setConversionToggle({
        year : true
    })
    }
    const conversionWeek = e=> {
    setConversionToggle({
        week : true
    })
    }
    const conversionDay =e=> {
    setConversionToggle({
        day : true
    })
    }

    //Subscriptions Toggle
    const subscriptionYear= e => {
        setSubscriptionToggle({
            year : true
        })
        }
        const subscriptionWeek = e=> {
        setSubscriptionToggle({
            week : true
        })
        }
        const subscriptionDay =e=> {
        setSubscriptionToggle({
            day : true
        })
        }


    return (
        <div className=" container-fluid dashboard" style={{marginTop: "120px",marginBottom: "1%"}}>
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
           <div className="row mt-4 dashboard__firstGraph" style={{position : "relative"}}>
              {loading && <div className="loader ">
                     <div class="spinner-border text-primary"></div>
                </div>}                  
               <div className="col-md-12 " >
                   <CustomBar barThikness="30" id1="bt1" id2="bt2" id3="bt3" backColor="rgba(96, 177, 255)"  chartHeight={80} 
                   labels={userToggle.year ? graphData.year.label : userToggle.week ? graphData.weeks.label :userToggle.day ? graphData.days.label : graphData.year.label} 
                   dataSet_data={userToggle.year ? graphData.year.dataSetData : userToggle.week ? graphData.weeks.dataSetData :userToggle.day ? graphData.days.dataSetData : graphData.year.dataSetData}  
                   totalNumber={userToggle.year ? graphData.year.totaluser : userToggle.week ? graphData.weeks.totaluser :userToggle.day ? graphData.days.totaluser : graphData.year.totaluser} 
                     headerLabel="Total Users" handleClickYear={userYear} handleClickWeek={userWeek} handleClickDay={userDay}/>
               </div>
           </div>
           <div className="row justify-content-between mt-4">
               <div className="col-md-6 mb-3 ">
               
                   <div className="row" style={{marginRight :"0px" , position : "relative"}}>
                   {loading && <div className="loader mr-3">
                     <div class="spinner-border text-primary"></div>
                    </div> }
                       <div className="col-md-12 dashboard__firstGraph">
                            <CustomBar barThikness="19" id1="bt4" id2="bt5" id3="bt6" backColor="rgb(64, 230, 242)" 
                            labels={conversionToggle.year ? graphData.year.label : conversionToggle.week ? graphData.weeks.label :conversionToggle.day ? graphData.days.label : graphData.year.label}  
                            dataSet_data={conversionToggle.year ? graphData.year.dataSetData : conversionToggle.week ? graphData.weeks.dataSetData :conversionToggle.day ? graphData.days.dataSetData : graphData.year.dataSetData}  
                            totalNumber={conversionToggle.year ? graphData.year.totaluser : conversionToggle.week ? graphData.weeks.totaluser :conversionToggle.day ? graphData.days.totaluser : graphData.year.totaluser}   
                            headerLabel="Total Conversions"   handleClickYear={conversionYear} handleClickWeek={conversionWeek} handleClickDay={conversionDay}/>
                       </div>
                   </div>
                     
               </div>
               <div className="col-md-6 mb-3">
                   <div className="row" style={{marginLeft : "0px" ,position : "relative"}}>
                    {loading && <div className="loader mr-3">
                        <div class="spinner-border text-primary"></div>
                        </div>} 
                       <div className="col-md-12 dashboard__firstGraph" >
                            <CustomBar barThikness="10" id1="bt7" id2="bt8" id3="bt9" backColor="rgb(104, 217, 119)" 
                            labels={subscriptionToggle.year ? graphData.year.label : subscriptionToggle.week ? graphData.weeks.label :subscriptionToggle.day ? graphData.days.label : graphData.year.label} 
                            dataSet_data={subscriptionToggle.year ? graphData.year.dataSetData : subscriptionToggle.week ? graphData.weeks.dataSetData :subscriptionToggle.day ? graphData.days.dataSetData : graphData.year.dataSetData}  
                            totalNumber={subscriptionToggle.year ? graphData.year.totaluser : subscriptionToggle.week ? graphData.weeks.totaluser :subscriptionToggle.day ? graphData.days.totaluser : graphData.year.totaluser}  
                            headerLabel="Total Subscriptions" handleClickYear={subscriptionYear} handleClickWeek={subscriptionWeek} handleClickDay={subscriptionDay}/>
                       </div>
                   </div>
                     
               </div>
           </div>
        </div>
    )
}

export default DashboardPage

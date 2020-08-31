import React,{useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'

 const CustomBar=({labels,dataSet_label ,dataSet_data , totalNumber , headerLabel , chartWidth , chartHeight , backColor}) =>{

   // const [chartData , setChartData] = useState();

    const data ={
        
            labels : labels,
            
            datasets: [
                {
                label: dataSet_label,
                data: dataSet_data,
                backgroundColor: backColor,
                borderColor: backColor,
                borderWidth: 1
            }
        ],
    }

    return (
        <div style={{paddingBottom: "10px"}}>
            <div className="text-left d-flex justify-content-between" style={{lineHeight: "0.9" , padding:"20px"}}>
               <div>
                    <h5 style={{color : backColor}}>{totalNumber}</h5>
                    <p>{headerLabel}</p>
               </div>
               <div className="d-flex">
                   <select className="form-control mr-3 customeChart__select" name="graphSelect" >
                       <option value="All">All</option>
                   </select>
                   <i className="fa fa-download mt-2" aria-hidden="true" style={{color : backColor}}></i>
               </div>
            </div>
            <Line width={chartWidth} height={chartHeight} data={data} options= {{
                responsive : true,
                maintainAspectRatio: true,
                legend : {
                        display : false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            autoSkip : true,
                            maxTicksLimit : 10
                        },
                        gridLines : {
                            display: false
                        }
                        
                    }],
                    xAxes: [{
                        gridLines: {
                            display : false
                        }
                    }]
                    
                }
            }}/>
        </div>
    )
}

export default CustomBar;

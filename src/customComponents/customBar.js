import React,{useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'

 const CustomBar=({labels,dataSet_label ,dataSet_data , totalNumber , headerLabel}) =>{

   // const [chartData , setChartData] = useState();

    const data ={
        
            labels : labels,
            
            datasets: [
                {
                label: dataSet_label,
                data: dataSet_data,
                backgroundColor: [
                    'rgb(175, 175, 175)'
                ],
                borderColor: [
                    'rgb(175, 175, 175)',
                ],
                borderWidth: 2
            }
        ],
    }

    return (
        <div>
            <div className="text-left" style={{lineHeight: "0.9" , padding:"20px"}}>
                <h5>{totalNumber}</h5>
                <p>{headerLabel}</p>
            </div>
            <Line data={data} options= {{
                responsive : true,
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

import React,{useState, useEffect} from 'react'
import {Bar} from 'react-chartjs-2'

 const CustomBar=({labels,dataSet_label ,dataSet_data , totalNumber , headerLabel , chartWidth , chartHeight , backColor , id1 , id2 ,id3 , barThikness}) =>{

   // const [chartData , setChartData] = useState();

    const data ={
        
            labels : labels,
            
            datasets: [
                {
                label: dataSet_label,
                data: dataSet_data,
                barThickness: barThikness,
                backgroundColor: backColor,
                borderColor: backColor,
                borderWidth: 1
            }
        ],
    }

    const styleAdd = e=> {
        e.preventDefault();
        if(e.target.id == "bt1"){
            document.getElementById("bt1").setAttribute("style" , "background-color: #009CB4; color: white; border: none; box-shadow : none;")

            document.getElementById("bt2").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
            document.getElementById("bt3").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
        }else if(e.target.id == "bt2"){
            document.getElementById("bt2").setAttribute("style" , "background-color: #009CB4; color: white; border: none; box-shadow : none;")

            document.getElementById("bt1").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
            document.getElementById("bt3").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
        }
        else if(e.target.id == "bt3"){
            document.getElementById("bt3").setAttribute("style" , "background-color: #009CB4; color: white; border: none; box-shadow : none;")

            document.getElementById("bt1").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
            document.getElementById("bt2").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
        }

        else if(e.target.id == "bt4"){
            document.getElementById("bt4").setAttribute("style" , "background-color: #009CB4; color: white; border: none; box-shadow : none;")

            document.getElementById("bt5").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
            document.getElementById("bt6").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
        }else if(e.target.id == "bt5"){
            document.getElementById("bt5").setAttribute("style" , "background-color: #009CB4; color: white; border: none; box-shadow : none;")

            document.getElementById("bt4").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
            document.getElementById("bt6").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
        }
        else if(e.target.id == "bt6"){
            document.getElementById("bt6").setAttribute("style" , "background-color: #009CB4; color: white; border: none; box-shadow : none;")

            document.getElementById("bt4").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
            document.getElementById("bt5").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
        }


        else if(e.target.id == "bt7"){
            document.getElementById("bt7").setAttribute("style" , "background-color: #009CB4; color: white; border: none; box-shadow : none;")

            document.getElementById("bt8").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
            document.getElementById("bt9").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
        }else if(e.target.id == "bt8"){
            document.getElementById("bt8").setAttribute("style" , "background-color: #009CB4; color: white; border: none; box-shadow : none;")

            document.getElementById("bt7").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
            document.getElementById("bt9").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
        }
        else if(e.target.id == "bt9"){
            document.getElementById("bt9").setAttribute("style" , "background-color: #009CB4; color: white; border: none; box-shadow : none;")

            document.getElementById("bt7").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
            document.getElementById("bt8").setAttribute("style" , "background-color: white; color :#707070;border : 0.1em solid #707070")
        }
    }

    return (
        <div style={{paddingBottom: "10px"}}>
            <div className="text-left d-flex justify-content-between" style={{lineHeight: "0.9" , padding:"20px"}}>
               <div>
                    <h5 style={{color : backColor}}>{totalNumber}</h5>
                    <p>{headerLabel}</p>
               </div>
               <div className="d-flex" onClick={styleAdd}>
                    <button id={id1} className="btn btn-primary mr-2 customeChart__select">Day</button>
                    <button id={id2} className="btn btn-primary mr-2 customeChart__select">Week</button>
                    <button id={id3} className="btn btn-primary mr-3 customeChart__select" style={{backgroundColor: '#009CB4' , color : "white" , border : "none"}}>Year</button>
                   <i className="fa fa-download mt-2" aria-hidden="true" style={{color : backColor}}></i>
               </div>
            </div>
            <Bar width={chartWidth} height={chartHeight} data={data} options= {{
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

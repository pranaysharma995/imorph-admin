import React from 'react'
import {Bar} from 'react-chartjs-2'

 const CustomBar=({labels,dataSet_label ,dataSet_data , totalNumber , headerLabel , chartHeight , backColor , id1 , id2 ,id3 , barThikness , handleClickYear , handleClickWeek , handleClickDay }) =>{

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
            <>
            <div className="text-left d-flex justify-content-between" style={{lineHeight: "0.9" , padding:"20px"}}>
               <div>
                    <h5 style={{color : backColor}}><strong>{totalNumber}</strong></h5>
                    <p>{headerLabel}</p>
               </div>
               <div className="d-flex" onClick={styleAdd}>
                    <button id={id1} className="btn btn-primary mr-2 customeChart__select" style={{lineHeight : "0px" , paddingTop :"0px",paddingBottom : "0px"}} onClick={handleClickDay}>Day</button>
                    <button id={id2} className="btn btn-primary mr-2 customeChart__select" style={{lineHeight : "0px",paddingTop :"0px",paddingBottom : "0px"}} onClick={handleClickWeek}>Week</button>
                    <button id={id3} className="btn btn-primary mr-3 customeChart__select"  style={{backgroundColor: '#009CB4' , color : "white" , border : "none",lineHeight : "0px",paddingTop :"0px",paddingBottom : "0px"}} onClick={handleClickYear}>Year</button>
                   <i className="fa fa-download mt-2" aria-hidden="true" style={{color : backColor}}></i>
               </div>
            </div>
            <Bar height={chartHeight} data={data} options= {{
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
            </>
    )
}

export default CustomBar;

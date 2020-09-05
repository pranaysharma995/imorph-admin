import React,{useState} from 'react'
import CKEditor from 'ckeditor4-react';

function Faq() {
    return (
        <div className ="faq">

            <div className="d-flex justify-content-end">                    
                    <button className="faq__add-btn" style={{position : 'relative'}}>
                        <i className="fa fa-plus faq__plus-icon" aria-hidden="true"></i>
                            Add New
                    </button>
            </div>

           <div className="faq__body">
                <div style={{padding : "0.7% 1.6%"}}>
                    <h3 style={{color : "#707070"}}>FAQ</h3>
                </div>
                <hr/>

               
                
                <div id="accordion" style={{ padding:"0% 2%"}}>

                        <div class="card">
                            <div class="card-header" data-toggle="collapse" >
                            <a class="card-link" href="#collapseOne">
                                Collapsible Group Item #1
                            </a>
                            </div>
                            <div id="collapseOne" class="collapse show" data-parent="#accordion">
                            <div class="card-body">
                                Lorem ipsum..
                            </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">
                            <a class="collapsed card-link" data-toggle="collapse" href="#collapseTwo">
                                Collapsible Group Item #2
                            </a>
                            </div>
                            <div id="collapseTwo" class="collapse" data-parent="#accordion">
                            <div class="card-body">
                                Lorem ipsum..
                            </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-header">
                            <a class="collapsed card-link" data-toggle="collapse" href="#collapseThree">
                                Collapsible Group Item #3
                            </a>
                            </div>
                            <div id="collapseThree" class="collapse" data-parent="#accordion">
                            <div class="card-body">
                                Lorem ipsum..
                            </div>
                            </div>
                        </div>

                        </div>

           </div>
        </div>
    )
}

export default Faq

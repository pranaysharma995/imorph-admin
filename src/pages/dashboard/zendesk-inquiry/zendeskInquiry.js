import React from 'react';
import Zendesk from "react-zendesk";

const setting = {
    color: {
      theme: "#000"
    },
    launcher: {
      chatLabel: {
        "en-US": "Need Help"
      }
    },
    contactForm: {
      fields: [
        { id: "description", prefill: { "*": "My pre-filled description" } }
      ]
    }
  };


class zendeskInquiry extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={

        }
    }
    render()
    {
        return(
            <>
            </>
        )
    }
}


export default zendeskInquiry
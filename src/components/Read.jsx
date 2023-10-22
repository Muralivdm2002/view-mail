import React, { useEffect } from "react";
import './read.css';
import { useState } from "react";
import moment from "moment";


function Read(props){

   const [mailData, setMailData] = useState([])

   useEffect(() => {
    console.log(props)
        setMailData(props?.data?.body?.replace( /(<([^>]+)>)/ig, '') )
   }, [props])
   

    return(
        <div className="read">
            <div className="profile">
                F
            </div>
            <div className="mailContent">
                <div className="head">
                    <div>
                        <div className="title">{props?.title}</div>
                        <div>{moment(new Date(props?.date)).format("d/mm/yyyy hh:MM:ss A")}</div>
                    </div>
                { props?.fav !== true ? <button onClick={()=>{props.onClick(props?.data?.id)}} >Mark as favourites</button> :  <button >favourite</button>  }
                </div>
                <div className="mailbody">
                    {mailData}
                </div>
            </div>
        </div>
    )
}

export default Read;
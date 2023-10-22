import React, { useEffect, useState } from "react";
import "./notification.css"
import moment from "moment/moment";


function Notification(props){

    const [notification, setNotification]  = useState([]);
    const [indexData, setIndexData] = useState(0)

    useEffect(()=>{
        setNotification(props?.data?.list)
    }, [props])

    const handleClick  = (index) => {
        setIndexData(index)
    }

    const NoData = <div>no data</div>

    return(
        <div >
            {notification?.length == 0 ? (<div>No data.</div>)  : (
            notification?.map((item, index)=>{ return (
                 <div className={ index == indexData ? 'notification notification-active' : "notification" } key={index} onClick={ ()=> {handleClick(index)} }>
                    <div className="noti-body" onClick={() => { props.comp !== 2 ? props.onClick(item.id) :  props.onClick(item.id) } }>
                        <div className="profile">F</div>
                        <div className="summary">
                            <div>From: <strong>{item?.from.email}</strong></div>
                            <div>Subject: <strong>{item?.from.name}</strong></div>
                            <div>{item?.short_description.substring(0, 30) + '...'}</div>
                            <div>
                                <div>{moment(new Date(item?.date)).format("d/mm/yyyy hh:MM:ss A")}</div>
                                <div className="favourite">Favourite</div>
                            </div>
                            </div>
                    </div>
                 </div>
            ) })
            )}
        </div>
    )
}

export default Notification;
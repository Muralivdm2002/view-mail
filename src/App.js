import { useEffect, useState } from 'react';
import './App.css';
import Notification from './components/Notification';
import Read from './components/Read';

function App() {

  const [buttonFocus, setButtonFocus] = useState(1)
  const [mailData, setMailData] = useState({})
  const [totalMails, setTotalMails] = useState([])

  const [unreadMailData, setUnreadMailData] = useState({})

  const [unreadFvrtData, setUnreadFvrtData] = useState({})


  const [favorites, setFavorites] = useState(false)
  const [corrsPost, sendCorrsPost] = useState([])
  const [postID, setPostID] = useState('1')

  const [postTile, setPostTile] = useState('');
  const [postDate, setPostDate] = useState('')


  const handleButtonClick = (number) =>{
    setButtonFocus(number)
  }

  const getEmail = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://flipkart-email-mock.now.sh/", requestOptions)
      .then(response => response.text())
      .then(result => {
        const listData = JSON.parse(result)
        const lists = listData?.list.map(item => {
          if(item.id == 1){
            item['favorites'] = false;  item['unread'] = true 
          }
           item['favorites'] = false;  item['unread'] = false 
           return item
           } )
        setTotalMails(lists)
        setMailData({list:lists, total:lists.length})
        setUnreadMailData({list:[lists[0]], total:1})
        setUnreadFvrtData({list:[lists[0]], total:1})
        setPostTile(lists[0].subject)
        setPostDate(lists[0].date)
      })
      .catch(error => alert('error', error));
  }


  useEffect( () => {
    getEmail()
  }, [])


  const sendIndex = (index) => {
    setPostID(index)
    if(buttonFocus !==2){
        const data = totalMails.map((item, i) => { 
          if(item.id === 1){
            item['unread'] = true
            return item
          }
          if(item.id === index){
            item['unread'] = true
            setPostTile(item.from.name)
            setPostDate(item.date)
            setFavorites(item.favorites)
            return item
          }
          return item
        })
        const filteredData = data.filter(item => item.unread === true)
        setFavtData(mailData)
        setUnreadMailData({list:filteredData, total: filteredData.length})
    }
  }


  const sendFavorites = (index) => {
    setPostID(index)
    setFavorites(true)
        const data = totalMails.map((item, i) => { 
          if(item.id === 1){
            item['favorites'] = true
            return item
          }
          if(item.id === index){
            item['favorites'] = true
            return item
          }
          return item
        })
        const filteredData = data.filter(item => item.favorites === true)
        setUnreadData(mailData)
        setUnreadFvrtData({list:filteredData, total: filteredData.length})
        setMailData({list:data, total: data.length})
  }

  useEffect(()=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://flipkart-email-mock.now.sh/?id="+postID, requestOptions)
      .then(response => response.text())
      .then(result => {
        let post = JSON.parse(result)
        sendCorrsPost(post);
      })
      .catch(error => console.log('error', error));
  },[postID])



  return (
    <div className="App">
        <div className="buttons">
            <div>Filter by:</div>
            <div className={buttonFocus === 1 && 'focus'}  onClick={()=>{handleButtonClick(1)}}>Unread</div>
            <div className={buttonFocus === 2 && 'focus'}  onClick={()=>{handleButtonClick(2)}}>Read</div>
            <div className={buttonFocus === 3 && 'focus'}  onClick={()=>{handleButtonClick(3)}}>Favourites</div>
        </div>
      <div className='main'>
        <div className='notification-panel'>
          { buttonFocus === 1 && <Notification comp={1} data={mailData} onClick={sendIndex} /> }
          { buttonFocus === 2 && <Notification comp={2} data={unreadMailData} onClick={sendIndex} /> }
          { buttonFocus === 3 && <Notification comp={3} data={unreadFvrtData} onClick={sendIndex} /> }
        </div>
        
          { buttonFocus === 1 && <Read comp={1} title={postTile} fav={favorites} date={postDate} data={corrsPost} onClick={sendFavorites} />  }
          { buttonFocus === 2 && <Read comp={2} title={postTile} fav={favorites} date={postDate} data={corrsPost} onClick={sendFavorites} />  }
          { buttonFocus === 3 && <Read comp={3} title={postTile} fav={favorites} date={postDate} data={corrsPost} onClick={sendFavorites} /> }

      </div>
    </div>
  );
}

export default App;

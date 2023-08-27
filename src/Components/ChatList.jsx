import React from 'react';
import ChatItem from './ChatItem';
import { Paper, List } from '@mui/material';
import { chatListStyle } from './Theme';
import ChatListHeader from './ChatListHeader';
import { useSearchContext } from '../Context/SearchContext';

const ChatList = () => {
  const search = useSearchContext();

  return (
    <Paper id="chatList" style={{ ...chatListStyle,borderRadius:"0px"}}>
      {/* Display selected user's profile */}
      {/* <Typography variant="h6" gutterBottom>
        Chats
      </Typography> */}
      <ChatListHeader />
      
      {/* Display search results */}
      {search.searchResults.length !== 0 && (
        <List>
          <p className='mx-3'>Search Results</p>
          {search.searchResults.map((resultItem) => (
            <ChatItem
              key={resultItem._id}
              avatarUrl={resultItem.avatar}
              username={resultItem.name}
              lastMessage={"Add Ravi"} // Replace with an appropriate message
            />
          ))}
        </List>
      )}

      {/* Display existing chats */}
      <List>
        <p className='mx-3'>Chats</p>
        <ChatItem
          itemId={1}
          avatarUrl={"https://media.istockphoto.com/id/1485546774/photo/bald-man-smiling-at-camera-standing-with-arms-crossed.webp?b=1&s=170667a&w=0&k=20&c=c2rsC66nJQAjkN6vCkhyB0vLHUiZhJSACMCBVF9HJJs="}
          username={"Ravi Paliwal"}
          lastMessage={"Welcome To WhiZchat!"}
        />
        <ChatItem
          itemId={2}
          avatarUrl={"https://th.bing.com/th?id=OIP.UGlKxiZQylR3CnJIXSbFIAHaLL&w=203&h=307&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"}
          username={"Shashwat Tiwari"}
          lastMessage={"Welcome To WhiZchat!"}
        />
        <ChatItem
          itemId={3}
          avatarUrl={"https://th.bing.com/th?id=ODL.cb5e3e93d0e6b69702932d9f87b0b462&w=197&h=112&c=7&rs=1&qlt=80&o=6&dpr=1.3&pid=RichNav"}
          username={"Deepti Sharma"}
          lastMessage={"Hi Ravi"}
        />
      </List>
    </Paper>
  );
};

export default ChatList;

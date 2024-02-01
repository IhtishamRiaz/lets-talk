// import { IoChevronBack } from "react-icons/io5";
// import { BsThreeDotsVertical } from "react-icons/bs";

const Message = ({ message, chat }) => {
   const sender = chat?.members?.find(
      (user) => user?._id === message?.senderId
   );

   const receiver = chat?.members?.find(
      (user) => user?._id !== message?.senderId
   );

   return (
      <div>
         {message.content} by {sender?.username} to {receiver?.username}
      </div>
   );
};

export default Message;

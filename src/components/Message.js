const Message = ({message, onMarkAsRead}) => {

    return (
        <div className={`p-4 border-b ${message.read ? 'bg-gray-100' : 'bg-white'}`}>
            <p className={`text-sm ${message.priority === 'high' ? 'text-red-500' : 'text-gray-900'}`}> 
                {message.content}
            </p>
            <p className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
            {!message.read && (
                <button 
                    className="text-blue-500 mt-2 text-xs" 
                    onClick={() => onMarkAsRead(message.id)}>
                    Mark as Read
                </button>
            )}
        </div>  
    )
}   

export default Message
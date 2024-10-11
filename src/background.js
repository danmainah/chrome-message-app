import store from './store';
import { fetchMessages } from './store';

function checkForUnreadMessages() {
    store.dispatch(fetchMessages()).then(() => {
      const unreadCount = store.getState().messages.messages.filter(m => !m.read).length;
      chrome.action.setBadgeText({ text: unreadCount ? unreadCount.toString() : '' });
    });
  }
  

// Check for unread messages on install and periodically
chrome.runtime.onInstalled.addListener(() => {
  checkForUnreadMessages();
  setInterval(checkForUnreadMessages, 2 * 60 * 1000); // Check every 2 minutes
});


  

export const getMessages = () => {
    return new Promise((resolve, reject) => {
      // Mocking an API call
      setTimeout(() => {
        const messages = [
          {
            id: "msg123",
            content: "Team meeting at 3 PM today 🙂",
            priority: "high",
            timestamp: "2024-09-30T15:00:00Z",
            read: false
          },
          {
            id: "msg456",
            content: "Lunch with colleagues today at 12 PM",
            priority: "low",
            timestamp: "2024-09-30T12:00:00Z",
            read: false
          },
          {
            id: "msg789",
            content: "Team build this sarturday from 9am 🙂",
            priority: "low",
            timestamp: "2024-09-30T15:00:00Z",
            read: false
          },
        ];
        chrome.storage.local.get('messages', (result) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            const storedMessages = result.messages || messages;
            resolve({ messages: storedMessages });
          }
        });
      }, 1000);
    });
  };
  
  export const markMessageAsRead = (id) => {
    chrome.storage.local.get('messages', (result) => {
      const messages = result.messages.map(m => m.id === id ? { ...m, read: true } : m);
      chrome.storage.local.set({ messages });
    });
  };
  
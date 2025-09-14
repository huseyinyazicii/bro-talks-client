import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import axios from 'axios';
import { useState } from 'react';
import '@livekit/components-styles';
const WS_URL = 'wss://test-egebv5xu.livekit.cloud';

function App() {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   const [connect, setConnect] = useState(false);
   const [token, setToken] = useState('');
   const [username, setUsername] = useState('');

   const getToken = async () => {
      setLoading(true);
      setConnect(true);
      try {
         const response = await axios.get(
            `https://huseyinyazici.bsite.net/api/TalkKit?username=${username}`
         );
         setToken(response.data);
      } catch (error) {
         setError(true);
         console.log('hata token');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div>
         <input
            placeholder='Kullanıcı Adı'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
         />
         <button onClick={getToken}>Gir</button>
         {connect &&
            (loading ? (
               'Loading'
            ) : error ? (
               'error'
            ) : (
               <LiveKitRoom token={token} serverUrl={WS_URL} connect={true}>
                  <VideoConference />
               </LiveKitRoom>
            ))}
      </div>
   );
}

export default App;

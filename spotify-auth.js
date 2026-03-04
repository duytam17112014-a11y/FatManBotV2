import play from 'play-dl';
import dotenv from 'dotenv';

dotenv.config();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectURL = 'http://localhost:3000/callback';
const market = process.env.SPOTIFY_MARKET || 'VN';

async function authorize() {
  try {
    const authURL = play.getFreeClientID();
    
    // Hoặc dùng client credentials của bạn
    await play.setToken({
      spotify: {
        client_id: client_id,
        client_secret: client_secret,
        refresh_token: '',
        market: market
      }
    });
    
    console.log('✅ Spotify đã được authorize!');
    console.log('Token data:', play.is_expired());
    
  } catch (error) {
    console.error('❌ Lỗi authorization:', error);
  }
}

authorize();
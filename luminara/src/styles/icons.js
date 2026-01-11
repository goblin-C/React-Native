import HomeIcon from '../assets/icons/home.svg';
import ChatIcon from '../assets/icons/chat.svg';
import ManIcon from '../assets/icons/man.svg';
import WomanIcon from '../assets/icons/woman.svg';

export const HomeTabIcon = ({ color }) => (
  <HomeIcon width={22} height={22} fill={color} />
)

export const ChatTabIcon = ({ color }) => (
  <ChatIcon width={22} height={22} fill={color} />
)

export const ProfileTabIcon = ({ focused, color }) =>
  focused ? (
    <ManIcon width={22} height={22} fill={color} />
  ) : (
    <WomanIcon width={22} height={22} fill={color} />
  )
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FiHome, FiMessageCircle, FiBarChart2 } from "react-icons/fi";
import { FaPlus, FaCheck, FaXmark, FaMagnifyingGlass } from "react-icons/fa6";
import { TbSettings } from "react-icons/tb";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LuMessageCirclePlus } from "react-icons/lu";
import { IoSend } from "react-icons/io5";

export const ICONS = {
  LOGIN: FaComment,
  HOME: FiHome,
  CHATTING: FiMessageCircle,
  REPORT: FiBarChart2,
  CHECK: FaCheck,
  PLUS: FaPlus,
  XMARK: FaXmark,
  SETTING: TbSettings,
  ARROWBACK: IoIosArrowBack,
  ARROWFORWARD: IoIosArrowForward,
  SEARCH: FaMagnifyingGlass,
  SEND: IoSend,
  CHAT_PLUS: LuMessageCirclePlus,
  CALENDAR: FaRegCalendarAlt,
} as const;

import dayActive from "../assets/images/day-active.png";
import notActive from "../assets/images/not-active.png";
import toActive from "../assets/images/to-active.png";
import not from "../assets/images/not.png";
import to from "../assets/images/to.png";
import today from "../assets/images/today.png";
import notDoDayThree from "../assets/images/notdoday-three.png";

export const IMAGES = {
  MASCOT: {
    SINGLE: {
      NOT: not,
      TO: to,
      DAY: today,
    },

    ACTIVE: {
      NOT: notActive,
      TO: toActive,
      DAY: dayActive,
    },

    THREE: {
      NOT_DO_DAY_THREE: notDoDayThree,
    },
  },
} as const;

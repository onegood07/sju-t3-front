import { IMAGES } from "../constants/images";
import type { Mascot, MascotName } from "../types/mascot";

export const MASCOT_DATA: Record<MascotName, Mascot> = {
  MascotNot: {
    name: "MascotNot",
    koreanName: "낫",
    image: IMAGES.MASCOT.SINGLE.NOT,
    activeImage: IMAGES.MASCOT.ACTIVE.NOT,
    description: "돈을 아껴야 해요.",
  },

  MascotTo: {
    name: "MascotTo",
    koreanName: "투",
    image: IMAGES.MASCOT.SINGLE.TO,
    activeImage: IMAGES.MASCOT.ACTIVE.TO,
    description: "조금만 더 힘내봐요!",
  },

  MascotDay: {
    name: "MascotDay",
    koreanName: "데이",
    image: IMAGES.MASCOT.SINGLE.DAY,
    activeImage: IMAGES.MASCOT.ACTIVE.DAY,
    description: "정말 잘하고 있어요!",
  },
};

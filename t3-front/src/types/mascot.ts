export type MascotName = "MascotNot" | "MascotTo" | "MascotDay";
export type MascotOnlyName = "NOT" | "DO" | "DAY";
export type MascotKoreanName = "낫" | "투" | "데이";

export type Mascot = {
  name: MascotName;
  koreanName: MascotKoreanName;
  image: string;
  activeImage: string;
  description: string;
};

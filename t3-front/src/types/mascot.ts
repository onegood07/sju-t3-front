export type MascotName = "MascotNot" | "MascotTo" | "MascotDay";

export type Mascot = {
  name: MascotName;
  image: string;
  description?: string;
};

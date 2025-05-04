import { StaticImageData } from "next/image";

export function utils_file_size(size: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }
  return `${size.toFixed(2)} ${units[index]}`;
}


export const utils_ImageobjectToString = (img: string | StaticImageData) => {
    return typeof img === "object" && "src" in img ? img.src : img || "";
  };
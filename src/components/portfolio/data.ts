import { MenuType } from "./types";

export const fetchProjectData = async (): Promise<MenuType[]> => {
  const response = await fetch("data/projectData.json");
  if (!response.ok) {
    throw new Error("Error fetching project data");
  }
  return response.json();
};

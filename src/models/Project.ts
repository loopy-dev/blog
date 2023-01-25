export interface Project {
  title: string;
  startDate: string;
  endDate?: string;
  introduction: string;
  description: Array<string | Link>;
  links: Link[];
  otherLinks?: Link[];
  images?: string[];
  skills: Skill[];
}

interface Link {
  name: string;
  url: string;
}

interface Skill {
  name: string;
  description: string;
}
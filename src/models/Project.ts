export interface Project {
  title: string;
  startDate: string;
  endDate?: string;
  introduction: string;
  description: Array<string | Link>;
  links: Partial<PersonalLink>;
  otherLinks?: Link[];
  images?: string[];
  skills: Skill[];
}

interface Link {
  name: string;
  url: string;
}

export interface Skill {
  name: string;
  description: string;
}

export interface PersonalLink {
  github: Link;
  website: Link;
  portfolio: Link;
}

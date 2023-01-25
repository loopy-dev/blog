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

interface Skill {
  name: string;
  description: string;
}

interface PersonalLink {
  github: Link;
  website: Link;
  portfolio: Link;
}

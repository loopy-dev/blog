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

export interface Link {
  name: string;
  url: string;
}

export interface Skill {
  name: string;
  description: string;
  subDescription?: string;
}

export interface PersonalLink {
  github: Link;
  website: Link;
  portfolio: Link;
}

export type Education = Pick<
  Project,
  'title' | 'startDate' | 'endDate' | 'introduction'
> & {
  description?: Array<string | Link>;
  links?: Partial<PersonalLink>;
  otherLinks?: Link[];
};

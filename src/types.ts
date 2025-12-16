export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  summary: string;
};

export type Education = {
  id: string;
  degree: string;
  school: string;
  period: string;
  detail: string;
};

export type CustomSection = {
  id: string;
  title: string;
  body: string;
};

export type Profile = {
  name: string;
  role: string;
  objective: string;
  photo: string;
};

export type Contact = {
  phone: string;
  email: string;
  location: string;
  website: string;
};

export type PhotoTransform = {
  scale: number;
  x: number;
  y: number;
};


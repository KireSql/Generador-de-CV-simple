import type { CustomSection, Education, Experience } from '../types';
import { uid } from '../utils/uid';

export const defaultExperiences: Experience[] = [
  {
    id: uid(),
    role: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Remoto',
    start: '2022',
    end: 'Actualidad',
    summary:
      'Lidero la interfaz de usuario de un SaaS, optimizando performance y accesibilidad para más de 50k usuarios.',
  },
  {
    id: uid(),
    role: 'Full Stack Engineer',
    company: 'CloudOps',
    location: 'CDMX',
    start: '2020',
    end: '2022',
    summary:
      'Diseñé APIs y pipelines CI/CD, reduciendo tiempos de despliegue y mejorando observabilidad.',
  },
];

export const defaultEducation: Education[] = [
  {
    id: uid(),
    degree: 'Ingeniería de Sistemas',
    school: 'Universidad Tecnológica',
    period: '2016 - 2020',
    detail: 'Mención en desarrollo de software y seguridad aplicada.',
  },
  {
    id: uid(),
    degree: 'Diplomado en Arquitectura Cloud',
    school: 'Escuela DevOps',
    period: '2023',
    detail: 'Enfoque en AWS, IaC y prácticas de observabilidad.',
  },
];

export const defaultCustomSections: CustomSection[] = [
  {
    id: uid(),
    title: 'Certificaciones',
    body: 'AWS Certified Solutions Architect (Associate), Scrum Product Owner.',
  },
];


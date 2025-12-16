import { useMemo, useRef, useState } from 'react';
import './App.css';
import { Contact, CustomSection, Education, Experience, PhotoTransform, Profile } from './types';
import { defaultCustomSections, defaultEducation, defaultExperiences } from './data/defaults';
import { uid } from './utils/uid';
import { PhotoCard } from './components/PhotoCard';
import { ContactCard } from './components/ContactCard';
import { SkillsCard } from './components/SkillsCard';
import { EducationSection } from './components/EducationSection';
import { HeroCard } from './components/HeroCard';
import { ObjectiveCard } from './components/ObjectiveCard';
import { ExperienceSection } from './components/ExperienceSection';
import { CustomSections } from './components/CustomSections';
import { Toolbar } from './components/Toolbar';

function App() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [activeEditor, setActiveEditor] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile>({
    name: 'Tu Nombre',
    role: 'Especialista en Tecnología',
    objective:
      'Breve objetivo profesional: el tipo de impacto que buscas lograr en tu próximo rol.',
    photo: '',
  });
  const [photoTransform, setPhotoTransform] = useState<PhotoTransform>({ scale: 1, x: 0, y: 0 });

  const [contact, setContact] = useState<Contact>({
    phone: '+00 000 0000',
    email: 'tu.email@correo.com',
    location: 'Ciudad, País',
    website: 'portfolio.dev',
  });

  const [skills, setSkills] = useState<string[]>([
    'React',
    'TypeScript',
    'Node.js',
    'REST / GraphQL',
    'Testing',
    'Cloud',
  ]);

  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences);
  const [education, setEducation] = useState<Education[]>(defaultEducation);
  const [customSections, setCustomSections] =
    useState<CustomSection[]>(defaultCustomSections);

  const initials = useMemo(() => {
    const letters = profile.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join('');
    return letters || 'CV';
  }, [profile.name]);

  const handlePhotoClick = () => {
    setActiveEditor('photo');
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfile((prev) => ({ ...prev, photo: reader.result as string }));
      setPhotoTransform({ scale: 1, x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoTransform = (key: keyof PhotoTransform, value: number) => {
    setPhotoTransform((prev) => ({ ...prev, [key]: value }));
  };

  const resetPhotoTransform = () => setPhotoTransform({ scale: 1, x: 0, y: 0 });

  const handleDownload = () => {
    window.print();
  };

  const updateExperience = (id: string, key: keyof Experience, value: string) => {
    setExperiences((items) =>
      items.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  const addExperience = () => {
    setExperiences((items) => [
      ...items,
      {
        id: uid(),
        role: 'Nuevo rol',
        company: 'Empresa',
        location: 'Ubicación',
        start: 'Año inicio',
        end: 'Año fin',
        summary: 'Describe logros, retos técnicos y resultados.',
      },
    ]);
    setActiveEditor(null);
  };

  const updateEducation = (id: string, key: keyof Education, value: string) => {
    setEducation((items) =>
      items.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  const addEducation = () => {
    setEducation((items) => [
      ...items,
      {
        id: uid(),
        degree: 'Nuevo programa',
        school: 'Institución',
        period: 'Año - Año',
        detail: 'Detalles o enfoque tecnológico.',
      },
    ]);
    setActiveEditor(null);
  };

  const addCustomSection = () => {
    setCustomSections((items) => [
      ...items,
      {
        id: uid(),
        title: 'Nueva sección',
        body: 'Agrega logros, patentes, voluntariado o publicaciones.',
      },
    ]);
    setActiveEditor(null);
  };

  const updateCustomSection = (
    id: string,
    key: keyof CustomSection,
    value: string
  ) => {
    setCustomSections((items) =>
      items.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    );
  };

  const handleSkillsChange = (value: string) => {
    const parsed = value
      .split(/,|\n/)
      .map((skill) => skill.trim())
      .filter(Boolean);
    setSkills(parsed);
  };

  const closeEditor = () => setActiveEditor(null);

  return (
    <div className="page">
      <Toolbar onDownload={handleDownload} />

      <aside className="sidebar">
        <PhotoCard
          photo={profile.photo}
          initials={initials}
          isActive={activeEditor === 'photo'}
          onOpen={handlePhotoClick}
          onClose={closeEditor}
          fileInputRef={fileInputRef}
          onFileChange={handlePhotoChange}
          transform={photoTransform}
          onTransformChange={handlePhotoTransform}
          onResetTransform={resetPhotoTransform}
        />

        <ContactCard
          contact={contact}
          isActive={activeEditor === 'contact'}
          onActivate={() => setActiveEditor('contact')}
          onClose={closeEditor}
          onChange={setContact}
        />

        <SkillsCard
          skills={skills}
          isActive={activeEditor === 'skills'}
          onActivate={() => setActiveEditor('skills')}
          onClose={closeEditor}
          onChange={handleSkillsChange}
        />

        <EducationSection
          items={education}
          activeId={activeEditor}
          onActivate={(id) => setActiveEditor(id)}
          onAdd={addEducation}
          onUpdate={updateEducation}
          onClose={closeEditor}
        />
      </aside>

      <main className="content">
        <HeroCard
          profile={profile}
          isActive={activeEditor === 'headline'}
          onActivate={() => setActiveEditor('headline')}
          onClose={closeEditor}
          onChange={setProfile}
        />

        <ObjectiveCard
          profile={profile}
          isActive={activeEditor === 'objective'}
          onActivate={() => setActiveEditor('objective')}
          onClose={closeEditor}
          onChange={setProfile}
        />

        <ExperienceSection
          items={experiences}
          activeId={activeEditor}
          onActivate={(id) => setActiveEditor(id)}
          onAdd={addExperience}
          onUpdate={updateExperience}
          onClose={closeEditor}
        />

        <CustomSections
          items={customSections}
          activeId={activeEditor}
          onActivate={(id) => setActiveEditor(id)}
          onAdd={addCustomSection}
          onUpdate={updateCustomSection}
          onClose={closeEditor}
        />
      </main>
    </div>
  );
}

export default App;


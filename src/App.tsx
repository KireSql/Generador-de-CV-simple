import { useMemo, useRef, useState } from 'react';
import './App.css';

type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  summary: string;
};

type Education = {
  id: string;
  degree: string;
  school: string;
  period: string;
  detail: string;
};

type CustomSection = {
  id: string;
  title: string;
  body: string;
};

const uid = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 10);

const defaultExperiences: Experience[] = [
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

const defaultEducation: Education[] = [
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

const defaultCustomSections: CustomSection[] = [
  {
    id: uid(),
    title: 'Certificaciones',
    body: 'AWS Certified Solutions Architect (Associate), Scrum Product Owner.',
  },
];

function App() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [activeEditor, setActiveEditor] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    name: 'Tu Nombre',
    role: 'Especialista en Tecnología',
    objective:
      'Breve objetivo profesional: el tipo de impacto que buscas lograr en tu próximo rol.',
    photo: '',
  });

  const [contact, setContact] = useState({
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
    };
    reader.readAsDataURL(file);
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
      <aside className="sidebar">
        <div className="photo-card" onClick={handlePhotoClick} role="button">
          <div className="photo-wrapper">
            {profile.photo ? (
              <img src={profile.photo} alt="Foto de perfil" className="photo" />
            ) : (
              <div className="placeholder">{initials}</div>
            )}
          </div>
          <p className="hint">Click para subir o cambiar la foto</p>
          {activeEditor === 'photo' && (
            <div className="inline-editor" onClick={(e) => e.stopPropagation()}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <button type="button" onClick={closeEditor}>
                Cerrar
              </button>
            </div>
          )}
        </div>

        <section
          className={`card clickable ${
            activeEditor === 'contact' ? 'editing' : ''
          }`}
          onClick={() => setActiveEditor('contact')}
        >
          <header className="card-header">
            <h3>Contacto</h3>
            <span className="badge">Editar</span>
          </header>
          {activeEditor === 'contact' ? (
            <div className="inline-editor" onClick={(e) => e.stopPropagation()}>
              <label>
                Teléfono
                <input
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder="Ej. +34 600 000 000"
                />
              </label>
              <label>
                Correo
                <input
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="nombre@correo.com"
                />
              </label>
              <label>
                Ciudad / País
                <input
                  value={contact.location}
                  onChange={(e) =>
                    setContact({ ...contact, location: e.target.value })
                  }
                  placeholder="Ciudad, País"
                />
              </label>
              <label>
                Sitio / LinkedIn
                <input
                  value={contact.website}
                  onChange={(e) =>
                    setContact({ ...contact, website: e.target.value })
                  }
                  placeholder="linkedin.com/in/usuario"
                />
              </label>
              <button type="button" onClick={closeEditor}>
                Guardar
              </button>
            </div>
          ) : (
            <ul className="list">
              <li>{contact.phone}</li>
              <li>{contact.email}</li>
              <li>{contact.website}</li>
              <li>{contact.location}</li>
            </ul>
          )}
        </section>

        <section
          className={`card clickable ${activeEditor === 'skills' ? 'editing' : ''}`}
          onClick={() => setActiveEditor('skills')}
        >
          <header className="card-header">
            <h3>Habilidades</h3>
            <span className="badge">Click para editar</span>
          </header>
          {activeEditor === 'skills' ? (
            <div className="inline-editor" onClick={(e) => e.stopPropagation()}>
              <label>
                Separa con comas o saltos de línea
                <textarea
                  value={skills.join('\n')}
                  onChange={(e) => handleSkillsChange(e.target.value)}
                  rows={4}
                />
              </label>
              <button type="button" onClick={closeEditor}>
                Guardar
              </button>
            </div>
          ) : (
            <div className="tags">
              {skills.map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </section>

        <section className="card">
          <header className="card-header">
            <h3>Educación</h3>
            <button className="ghost" type="button" onClick={addEducation}>
              Añadir sección
            </button>
          </header>
          {education.map((item) => (
            <article
              key={item.id}
              className={`subcard clickable ${
                activeEditor === item.id ? 'editing' : ''
              }`}
              onClick={() => setActiveEditor(item.id)}
            >
              {activeEditor === item.id ? (
                <div className="inline-editor" onClick={(e) => e.stopPropagation()}>
                  <label>
                    Programa
                    <input
                      value={item.degree}
                      onChange={(e) =>
                        updateEducation(item.id, 'degree', e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Institución
                    <input
                      value={item.school}
                      onChange={(e) =>
                        updateEducation(item.id, 'school', e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Periodo
                    <input
                      value={item.period}
                      onChange={(e) =>
                        updateEducation(item.id, 'period', e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Detalle
                    <textarea
                      rows={3}
                      value={item.detail}
                      onChange={(e) =>
                        updateEducation(item.id, 'detail', e.target.value)
                      }
                    />
                  </label>
                  <button type="button" onClick={closeEditor}>
                    Guardar
                  </button>
                </div>
              ) : (
                <>
                  <p className="muted">{item.period}</p>
                  <h4>{item.degree}</h4>
                  <p className="subtext">{item.school}</p>
                  <p className="detail">{item.detail}</p>
                </>
              )}
            </article>
          ))}
        </section>
      </aside>

      <main className="content">
        <section
          className={`card hero clickable ${
            activeEditor === 'headline' ? 'editing' : ''
          }`}
          onClick={() => setActiveEditor('headline')}
        >
          {activeEditor === 'headline' ? (
            <div className="inline-editor" onClick={(e) => e.stopPropagation()}>
              <label>
                Nombre completo
                <input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </label>
              <label>
                Rol / especialidad
                <input
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                />
              </label>
              <button type="button" onClick={closeEditor}>
                Guardar
              </button>
            </div>
          ) : (
            <>
              <p className="muted">Perfil profesional</p>
              <h1>{profile.name}</h1>
              <h2>{profile.role}</h2>
            </>
          )}
        </section>

        <section
          className={`card clickable ${
            activeEditor === 'objective' ? 'editing' : ''
          }`}
          onClick={() => setActiveEditor('objective')}
        >
          <header className="card-header">
            <h3>Objetivo</h3>
            <span className="badge">Click para editar</span>
          </header>
          {activeEditor === 'objective' ? (
            <div className="inline-editor" onClick={(e) => e.stopPropagation()}>
              <textarea
                rows={4}
                value={profile.objective}
                onChange={(e) =>
                  setProfile({ ...profile, objective: e.target.value })
                }
              />
              <button type="button" onClick={closeEditor}>
                Guardar
              </button>
            </div>
          ) : (
            <p className="detail">{profile.objective}</p>
          )}
        </section>

        <section className="card">
          <header className="card-header">
            <h3>Experiencia</h3>
            <button className="ghost" type="button" onClick={addExperience}>
              Añadir sección
            </button>
          </header>
          <div className="stack">
            {experiences.map((job) => (
              <article
                key={job.id}
                className={`subcard clickable ${
                  activeEditor === job.id ? 'editing' : ''
                }`}
                onClick={() => setActiveEditor(job.id)}
              >
                {activeEditor === job.id ? (
                  <div className="inline-editor" onClick={(e) => e.stopPropagation()}>
                    <label>
                      Rol
                      <input
                        value={job.role}
                        onChange={(e) =>
                          updateExperience(job.id, 'role', e.target.value)
                        }
                      />
                    </label>
                    <label>
                      Empresa
                      <input
                        value={job.company}
                        onChange={(e) =>
                          updateExperience(job.id, 'company', e.target.value)
                        }
                      />
                    </label>
                    <label>
                      Ubicación
                      <input
                        value={job.location}
                        onChange={(e) =>
                          updateExperience(job.id, 'location', e.target.value)
                        }
                      />
                    </label>
                    <div className="row">
                      <label>
                        Inicio
                        <input
                          value={job.start}
                          onChange={(e) =>
                            updateExperience(job.id, 'start', e.target.value)
                          }
                        />
                      </label>
                      <label>
                        Fin
                        <input
                          value={job.end}
                          onChange={(e) =>
                            updateExperience(job.id, 'end', e.target.value)
                          }
                        />
                      </label>
                    </div>
                    <label>
                      Logros / impacto
                      <textarea
                        rows={3}
                        value={job.summary}
                        onChange={(e) =>
                          updateExperience(job.id, 'summary', e.target.value)
                        }
                      />
                    </label>
                    <button type="button" onClick={closeEditor}>
                      Guardar
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="subcard-header">
                      <div>
                        <p className="muted">
                          {job.start} — {job.end}
                        </p>
                        <h4>{job.role}</h4>
                        <p className="subtext">
                          {job.company} · {job.location}
                        </p>
                      </div>
                      <span className="badge">Editar</span>
                    </div>
                    <p className="detail">{job.summary}</p>
                  </>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="card">
          <header className="card-header">
            <h3>Secciones personalizadas</h3>
            <button className="ghost" type="button" onClick={addCustomSection}>
              Añadir sección
            </button>
          </header>
          <div className="stack">
            {customSections.map((section) => (
              <article
                key={section.id}
                className={`subcard clickable ${
                  activeEditor === section.id ? 'editing' : ''
                }`}
                onClick={() => setActiveEditor(section.id)}
              >
                {activeEditor === section.id ? (
                  <div className="inline-editor" onClick={(e) => e.stopPropagation()}>
                    <label>
                      Título
                      <input
                        value={section.title}
                        onChange={(e) =>
                          updateCustomSection(section.id, 'title', e.target.value)
                        }
                      />
                    </label>
                    <label>
                      Contenido
                      <textarea
                        rows={3}
                        value={section.body}
                        onChange={(e) =>
                          updateCustomSection(section.id, 'body', e.target.value)
                        }
                      />
                    </label>
                    <button type="button" onClick={closeEditor}>
                      Guardar
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="subcard-header">
                      <h4>{section.title}</h4>
                      <span className="badge">Editar</span>
                    </div>
                    <p className="detail">{section.body}</p>
                  </>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;


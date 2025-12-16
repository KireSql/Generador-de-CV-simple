import { Experience } from '../types';

type ExperienceSectionProps = {
  items: Experience[];
  activeId: string | null;
  onActivate: (id: string) => void;
  onAdd: () => void;
  onUpdate: (id: string, key: keyof Experience, value: string) => void;
  onClose: () => void;
};

export function ExperienceSection({
  items,
  activeId,
  onActivate,
  onAdd,
  onUpdate,
  onClose,
}: ExperienceSectionProps) {
  return (
    <section className="card">
      <header className="card-header">
        <h3>Experiencia</h3>
        <button className="ghost" type="button" onClick={onAdd}>
          Añadir sección
        </button>
      </header>
      <div className="stack">
        {items.map((job) => (
          <article
            key={job.id}
            className={`subcard clickable ${activeId === job.id ? 'editing' : ''}`}
            onClick={() => onActivate(job.id)}
          >
            {activeId === job.id ? (
              <div className="inline-editor" onClick={(e) => e.stopPropagation()}>
                <label>
                  Rol
                  <input
                    value={job.role}
                    onChange={(e) => onUpdate(job.id, 'role', e.target.value)}
                  />
                </label>
                <label>
                  Empresa
                  <input
                    value={job.company}
                    onChange={(e) => onUpdate(job.id, 'company', e.target.value)}
                  />
                </label>
                <label>
                  Ubicación
                  <input
                    value={job.location}
                    onChange={(e) => onUpdate(job.id, 'location', e.target.value)}
                  />
                </label>
                <div className="row">
                  <label>
                    Inicio
                    <input
                      value={job.start}
                      onChange={(e) => onUpdate(job.id, 'start', e.target.value)}
                    />
                  </label>
                  <label>
                    Fin
                    <input
                      value={job.end}
                      onChange={(e) => onUpdate(job.id, 'end', e.target.value)}
                    />
                  </label>
                </div>
                <label>
                  Logros / impacto
                  <textarea
                    rows={3}
                    value={job.summary}
                    onChange={(e) => onUpdate(job.id, 'summary', e.target.value)}
                  />
                </label>
                <button type="button" onClick={onClose}>
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
  );
}


import type { Education } from '../types';

type EducationSectionProps = {
  items: Education[];
  activeId: string | null;
  onActivate: (id: string) => void;
  onAdd: () => void;
  onUpdate: (id: string, key: keyof Education, value: string) => void;
  onClose: () => void;
};

export function EducationSection({
  items,
  activeId,
  onActivate,
  onAdd,
  onUpdate,
  onClose,
}: EducationSectionProps) {
  return (
    <section className="card">
      <header className="card-header">
        <h3>Educación</h3>
        <button className="ghost" type="button" onClick={onAdd}>
          Añadir sección
        </button>
      </header>
      {items.map((item) => (
        <article
          key={item.id}
          className={`subcard clickable ${activeId === item.id ? 'editing' : ''}`}
          onClick={() => onActivate(item.id)}
        >
          {activeId === item.id ? (
            <div className="inline-editor" onClick={(e) => e.stopPropagation()}>
              <label>
                Programa
                <input
                  value={item.degree}
                  onChange={(e) => onUpdate(item.id, 'degree', e.target.value)}
                />
              </label>
              <label>
                Institución
                <input
                  value={item.school}
                  onChange={(e) => onUpdate(item.id, 'school', e.target.value)}
                />
              </label>
              <label>
                Periodo
                <input
                  value={item.period}
                  onChange={(e) => onUpdate(item.id, 'period', e.target.value)}
                />
              </label>
              <label>
                Detalle
                <textarea
                  rows={3}
                  value={item.detail}
                  onChange={(e) => onUpdate(item.id, 'detail', e.target.value)}
                />
              </label>
              <button type="button" onClick={onClose}>
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
  );
}


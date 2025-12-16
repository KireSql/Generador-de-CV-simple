import type { CustomSection } from '../types';

type CustomSectionsProps = {
  items: CustomSection[];
  activeId: string | null;
  onActivate: (id: string) => void;
  onAdd: () => void;
  onUpdate: (id: string, key: keyof CustomSection, value: string) => void;
  onClose: () => void;
};

export function CustomSections({
  items,
  activeId,
  onActivate,
  onAdd,
  onUpdate,
  onClose,
}: CustomSectionsProps) {
  return (
    <section className="card">
      <header className="card-header">
        <h3>Secciones personalizadas</h3>
        <button className="ghost" type="button" onClick={onAdd}>
          Añadir sección
        </button>
      </header>
      <div className="stack">
        {items.map((section) => (
          <article
            key={section.id}
            className={`subcard clickable ${activeId === section.id ? 'editing' : ''}`}
            onClick={() => onActivate(section.id)}
          >
            {activeId === section.id ? (
              <div className="inline-editor" onClick={(e) => e.stopPropagation()}>
                <label>
                  Título
                  <input
                    value={section.title}
                    onChange={(e) => onUpdate(section.id, 'title', e.target.value)}
                  />
                </label>
                <label>
                  Contenido
                  <textarea
                    rows={3}
                    value={section.body}
                    onChange={(e) => onUpdate(section.id, 'body', e.target.value)}
                  />
                </label>
                <button type="button" onClick={onClose}>
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
  );
}


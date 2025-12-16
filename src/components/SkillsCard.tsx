type SkillsCardProps = {
  skills: string[];
  isActive: boolean;
  onActivate: () => void;
  onClose: () => void;
  onChange: (value: string) => void;
};

export function SkillsCard({ skills, isActive, onActivate, onClose, onChange }: SkillsCardProps) {
  return (
    <section
      className={`card clickable ${isActive ? 'editing' : ''}`}
      onClick={onActivate}
    >
      <header className="card-header">
        <h3>Habilidades</h3>
        <span className="badge">Click para editar</span>
      </header>
      {isActive ? (
        <div className="inline-editor" onClick={(e) => e.stopPropagation()}>
          <label>
            Separa con comas o saltos de línea
            <textarea
              value={skills.join('\n')}
              onChange={(e) => onChange(e.target.value)}
              rows={4}
            />
          </label>
          <button type="button" onClick={onClose}>
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
  );
}


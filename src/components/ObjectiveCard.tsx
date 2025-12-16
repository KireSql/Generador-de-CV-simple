import { Profile } from '../types';

type ObjectiveCardProps = {
  profile: Profile;
  isActive: boolean;
  onActivate: () => void;
  onClose: () => void;
  onChange: (value: Profile) => void;
};

export function ObjectiveCard({
  profile,
  isActive,
  onActivate,
  onClose,
  onChange,
}: ObjectiveCardProps) {
  return (
    <section
      className={`card clickable ${isActive ? 'editing' : ''}`}
      onClick={onActivate}
    >
      <header className="card-header">
        <h3>Objetivo</h3>
        <span className="badge">Click para editar</span>
      </header>
      {isActive ? (
        <div className="inline-editor" onClick={(e) => e.stopPropagation()}>
          <textarea
            rows={4}
            value={profile.objective}
            onChange={(e) => onChange({ ...profile, objective: e.target.value })}
          />
          <button type="button" onClick={onClose}>
            Guardar
          </button>
        </div>
      ) : (
        <p className="detail">{profile.objective}</p>
      )}
    </section>
  );
}


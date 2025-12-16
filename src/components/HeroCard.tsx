import type { Profile } from '../types';

type HeroCardProps = {
  profile: Profile;
  isActive: boolean;
  onActivate: () => void;
  onClose: () => void;
  onChange: (value: Profile) => void;
};

export function HeroCard({ profile, isActive, onActivate, onClose, onChange }: HeroCardProps) {
  return (
    <section
      className={`card hero clickable ${isActive ? 'editing' : ''}`}
      onClick={onActivate}
    >
      {isActive ? (
        <div className="inline-editor" onClick={(e) => e.stopPropagation()}>
          <label>
            Nombre completo
            <input
              value={profile.name}
              onChange={(e) => onChange({ ...profile, name: e.target.value })}
            />
          </label>
          <label>
            Rol / especialidad
            <input
              value={profile.role}
              onChange={(e) => onChange({ ...profile, role: e.target.value })}
            />
          </label>
          <button type="button" onClick={onClose}>
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
  );
}


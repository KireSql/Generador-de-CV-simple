import type { Contact } from '../types';

type ContactCardProps = {
  contact: Contact;
  isActive: boolean;
  onActivate: () => void;
  onClose: () => void;
  onChange: (value: Contact) => void;
};

export function ContactCard({ contact, isActive, onActivate, onClose, onChange }: ContactCardProps) {
  return (
    <section
      className={`card clickable ${isActive ? 'editing' : ''}`}
      onClick={onActivate}
    >
      <header className="card-header">
        <h3>Contacto</h3>
        <span className="badge">Editar</span>
      </header>
      {isActive ? (
        <div className="inline-editor" onClick={(e) => e.stopPropagation()}>
          <label>
            Teléfono
            <input
              value={contact.phone}
              onChange={(e) => onChange({ ...contact, phone: e.target.value })}
              placeholder="Ej. +34 600 000 000"
            />
          </label>
          <label>
            Correo
            <input
              value={contact.email}
              onChange={(e) => onChange({ ...contact, email: e.target.value })}
              placeholder="nombre@correo.com"
            />
          </label>
          <label>
            Ciudad / País
            <input
              value={contact.location}
              onChange={(e) => onChange({ ...contact, location: e.target.value })}
              placeholder="Ciudad, País"
            />
          </label>
          <label>
            Sitio / LinkedIn
            <input
              value={contact.website}
              onChange={(e) => onChange({ ...contact, website: e.target.value })}
              placeholder="linkedin.com/in/usuario"
            />
          </label>
          <button type="button" onClick={onClose}>
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
  );
}


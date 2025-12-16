import type { RefObject } from 'react';
import type { PhotoTransform } from '../types';

type PhotoCardProps = {
  photo: string;
  initials: string;
  isActive: boolean;
  onOpen: () => void;
  onClose: () => void;
  fileInputRef: RefObject<HTMLInputElement>;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  transform: PhotoTransform;
  onTransformChange: (key: keyof PhotoTransform, value: number) => void;
  onResetTransform: () => void;
};

export function PhotoCard({
  photo,
  initials,
  isActive,
  onOpen,
  onClose,
  fileInputRef,
  onFileChange,
  transform,
  onTransformChange,
  onResetTransform,
}: PhotoCardProps) {
  return (
    <div className="photo-card" onClick={onOpen} role="button">
      <div className="photo-wrapper">
        {photo ? (
          <img
            src={photo}
            alt="Foto de perfil"
            className="photo"
            style={{
              transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
              transformOrigin: 'center',
            }}
          />
        ) : (
          <div className="placeholder">{initials}</div>
        )}
      </div>
      <p className="hint">Click para subir o cambiar la foto</p>
      {isActive && (
        <div className="inline-editor" onClick={(e) => e.stopPropagation()}>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileChange} />
          <div className="photo-controls">
            <label className="control-row">
              Zoom
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.05"
                value={transform.scale}
                onChange={(e) => onTransformChange('scale', Number(e.target.value))}
              />
              <span className="control-value">{transform.scale.toFixed(2)}x</span>
            </label>
            <label className="control-row">
              Desplazar X
              <input
                type="range"
                min="-80"
                max="80"
                step="1"
                value={transform.x}
                onChange={(e) => onTransformChange('x', Number(e.target.value))}
              />
              <span className="control-value">{transform.x}px</span>
            </label>
            <label className="control-row">
              Desplazar Y
              <input
                type="range"
                min="-80"
                max="80"
                step="1"
                value={transform.y}
                onChange={(e) => onTransformChange('y', Number(e.target.value))}
              />
              <span className="control-value">{transform.y}px</span>
            </label>
            <div className="control-actions">
              <button type="button" className="ghost" onClick={onResetTransform}>
                Reset foto
              </button>
            </div>
          </div>
          <button type="button" onClick={onClose}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}


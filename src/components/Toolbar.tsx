type ToolbarProps = {
  onDownload: () => void;
};

export function Toolbar({ onDownload }: ToolbarProps) {
  return (
    <div className="toolbar no-export">
      <button className="primary-btn" type="button" onClick={onDownload}>
        Descargar CV en PDF
      </button>
    </div>
  );
}


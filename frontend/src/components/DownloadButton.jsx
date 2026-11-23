import { getDownloadUrl } from '../services/documentApi';

export default function DownloadButton({ documentId, fileName }) {
  return (
    <a
      href={getDownloadUrl(documentId)}
      download={fileName}
      aria-label={`Baixar ${fileName}`}
    >
      Baixar
    </a>
  );
}

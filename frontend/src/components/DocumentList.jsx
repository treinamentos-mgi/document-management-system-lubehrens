import DownloadButton from './DownloadButton';

function formatSize(size) {
  if (size < 1024) {
    return `${size} B`;
  }

  return `${(size / 1024).toFixed(1)} KB`;
}

export default function DocumentList({ documents, isLoading, error }) {
  if (isLoading) {
    return <p>Carregando documentos...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (documents.length === 0) {
    return <p>Nenhum documento enviado.</p>;
  }

  return (
    <ul>
      {documents.map((document) => (
        <li key={document.id}>
          <div>
            <strong>{document.originalName}</strong>
            <span>
              {formatSize(document.size)} -{' '}
              {new Date(document.uploadedAt).toLocaleString('pt-BR')}
            </span>
          </div>
          <DownloadButton
            documentId={document.id}
            fileName={document.originalName}
          />
        </li>
      ))}
    </ul>
  );
}

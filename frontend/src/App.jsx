import { useCallback, useEffect, useState } from 'react';
import UploadComponent from './components/UploadComponent';
import DocumentList from './components/DocumentList';
import { listDocuments } from './services/documentApi';

export default function App() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const refreshDocuments = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      setDocuments(await listDocuments());
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshDocuments();
  }, [refreshDocuments]);

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>Document Management System</h1>

      <UploadComponent onUploaded={refreshDocuments} />

      <section aria-labelledby="documents-title">
        <h2 id="documents-title">Documentos</h2>
        <DocumentList
          documents={documents}
          isLoading={isLoading}
          error={error}
        />
      </section>
    </main>
  );
}

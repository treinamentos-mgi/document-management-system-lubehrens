import { useRef, useState } from 'react';
import { uploadDocument } from '../services/documentApi';

export default function UploadComponent({ onUploaded }) {
  const formRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      setMessage('Selecione um documento antes de enviar.');
      return;
    }

    setIsUploading(true);
    setMessage('');

    try {
      await uploadDocument(file);
      setFile(null);
      formRef.current?.reset();
      setMessage('Documento enviado com sucesso.');
      onUploaded();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <section aria-labelledby="upload-title">
      <h2 id="upload-title">Enviar documento</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(event) => setFile(event.target.files[0] || null)}
          disabled={isUploading}
        />
        <button type="submit" disabled={isUploading || !file}>
          {isUploading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      {message && <p role="status">{message}</p>}
    </section>
  );
}

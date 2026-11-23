const API_PREFIX = '/api';

async function readResponse(response) {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

async function request(path, options) {
  const response = await fetch(`${API_PREFIX}${path}`, options);

  if (!response.ok) {
    const body = await readResponse(response);
    const message = typeof body === 'object' && body?.message
      ? body.message
      : 'Não foi possível concluir a operação';
    throw new Error(message);
  }

  return response;
}

export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await request('/upload', {
    method: 'POST',
    body: formData,
  });

  return response.json();
}

export async function listDocuments() {
  const response = await request('/documents');
  return response.json();
}

export function getDownloadUrl(documentId) {
  return `${API_PREFIX}/documents/${encodeURIComponent(documentId)}/download`;
}

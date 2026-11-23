const documentRepository = require('../repositories/documentRepository');

function uploadDocument(file, owner) {
  if (!file) {
    const error = new Error('Nenhum arquivo foi enviado');
    error.code = 'file_required';
    error.statusCode = 400;
    throw error;
  }

  const document = documentRepository.create(file, owner);
  return documentRepository.toPublicDocument(document);
}

function listDocuments() {
  return documentRepository
    .findAll()
    .map(documentRepository.toPublicDocument);
}

function getDocument(id) {
  if (!id) {
    const error = new Error('Identificador do documento inválido');
    error.code = 'invalid_document_id';
    error.statusCode = 400;
    throw error;
  }

  const document = documentRepository.findById(id);
  if (!document) {
    const error = new Error('Documento não encontrado');
    error.code = 'document_not_found';
    error.statusCode = 404;
    throw error;
  }

  return document;
}

module.exports = {
  uploadDocument,
  listDocuments,
  getDocument,
};

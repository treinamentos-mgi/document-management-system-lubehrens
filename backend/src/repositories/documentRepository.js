const { randomUUID } = require('node:crypto');

const documents = [];

function create(file, owner) {
  const document = {
    id: randomUUID(),
    originalName: file.originalname,
    size: file.size,
    uploadedAt: new Date().toISOString(),
    owner,
    mimeType: file.mimetype,
    storedName: file.filename,
  };

  documents.push(document);
  return document;
}

function findAll() {
  return [...documents].sort((left, right) =>
    right.uploadedAt.localeCompare(left.uploadedAt)
  );
}

function findById(id) {
  return documents.find((document) => document.id === id);
}

function toPublicDocument(document) {
  return {
    id: document.id,
    originalName: document.originalName,
    size: document.size,
    uploadedAt: document.uploadedAt,
    owner: document.owner,
  };
}

module.exports = {
  create,
  findAll,
  findById,
  toPublicDocument,
};

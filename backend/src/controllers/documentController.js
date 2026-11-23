const fs = require('node:fs');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const multer = require('multer');
const documentService = require('../services/documentService');

const storageDirectory = process.env.STORAGE_DIR
  ? path.resolve(process.env.STORAGE_DIR)
  : path.resolve(__dirname, '../../storage');

fs.mkdirSync(storageDirectory, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, storageDirectory);
    },
    filename(req, file, callback) {
      const safeName = path.basename(file.originalname)
        .replace(/[^a-zA-Z0-9._-]/g, '_');
      callback(null, `${randomUUID()}-${safeName}`);
    },
  }),
});

function uploadMiddleware(req, res, next) {
  upload.single('file')(req, res, (error) => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof multer.MulterError) {
      res.status(400).json({
        error: 'invalid_multipart',
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      error: 'storage_error',
      message: 'Não foi possível armazenar o arquivo',
    });
  });
}

function sendError(res, error) {
  res.status(error.statusCode || 500).json({
    error: error.code || 'internal_error',
    message: error.message || 'Erro interno do servidor',
  });
}

function uploadDocument(req, res) {
  try {
    const owner = process.env.OWNER_ID || 'default';
    const document = documentService.uploadDocument(req.file, owner);
    res.status(201).json(document);
  } catch (error) {
    sendError(res, error);
  }
}

function listDocuments(req, res) {
  try {
    res.status(200).json(documentService.listDocuments());
  } catch (error) {
    sendError(res, error);
  }
}

function downloadDocument(req, res) {
  try {
    const document = documentService.getDocument(req.params.id);
    const filePath = path.join(storageDirectory, document.storedName);

    res.download(filePath, document.originalName, (error) => {
      if (!res.headersSent) {
        if (error && error.code === 'ENOENT') {
          res.status(404).json({
            error: 'document_not_found',
            message: 'Arquivo não encontrado',
          });
        } else {
          res.status(500).json({
            error: 'storage_error',
            message: 'Não foi possível ler o arquivo',
          });
        }
      }
    });
  } catch (error) {
    sendError(res, error);
  }
}

module.exports = {
  uploadMiddleware,
  uploadDocument,
  listDocuments,
  downloadDocument,
};

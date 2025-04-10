import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import QRDisplay from './components/QRDisplay';
import PDFGenerator from './components/PDFGenerator';
import { Container, Box, Typography } from '@mui/material';
import "./App.css";

function App() {
  const [urls, setUrls] = useState([]);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          QR Code Generator
        </Typography>
        <Typography variant="subtitle1" align="center" paragraph>
          Upload an Excel file with URLs to generate QR codes
        </Typography>
        
        <FileUploader onFileProcessed={setUrls} />
        
        <Box my={4} display="flex" justifyContent="center">
          <PDFGenerator urls={urls} />
        </Box>
        
        <QRDisplay urls={urls} />
      </Box>
    </Container>
  );
}

export default App;
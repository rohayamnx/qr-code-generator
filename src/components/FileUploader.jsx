import React, { useState } from 'react';
import { Button, Link } from '@mui/material';
import * as XLSX from 'xlsx';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUploader = ({ onFileProcessed }) => {
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      
      // Extract URLs - assuming they're in a column named "URL"
      const urls = jsonData.map(row => row.URL).filter(url => url);
      onFileProcessed(urls);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="upload-container">
      <Button
        variant="outlined"
        color="primary"
        href="/QR_Template.xlsx"
        download
        style={{ marginRight: '10px' }} // Add spacing here
      >
        Download Excel Template
      </Button>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
      >
        Upload Excel File
        <input
          type="file"
          hidden
          accept=".xlsx, .xls, .csv"
          onChange={handleFileUpload}
        />
      </Button>
      {fileName && <p>Selected file: {fileName}</p>}
    </div>
  );
};

export default FileUploader;
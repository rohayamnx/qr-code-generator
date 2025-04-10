import React from 'react';
import QRCode from 'react-qr-code'; // Updated import
import { Grid, Paper, Typography } from '@mui/material';

const QRDisplay = ({ urls }) => {
  if (!urls || urls.length === 0) {
    return <p>No URLs found in the file.</p>;
  }

  return (
    <div className="qr-container">
      <Grid container spacing={2}>
        {urls.map((url, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
              <Typography variant="subtitle1" gutterBottom>
                {url.length > 30 ? `${url.substring(0, 30)}...` : url}
              </Typography>
              <div style={{ 
                padding: '10px', 
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <QRCode 
                  value={url} 
                  size={128}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  level="Q" // Error correction level (L, M, Q, H)
                />
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default QRDisplay;
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function TextPreview({
  label,
  value,
  dir,
}) {
  return (
    <bdi dir={dir}>
      <Box sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 120,
        textAlign: 'center',
        border: 1,
        borderRadius: 4,
        marginBottom: 4,
      }}
      >
        {label && (
        <Typography sx={{
          top: 0,
          position: 'absolute',
          textDecoration: 'underline',
        }}
        >
          {label}
        </Typography>
        )}
        <Typography>
          {value}
        </Typography>
      </Box>
    </bdi>
  );
}

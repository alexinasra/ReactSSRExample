import React from 'react';

import LayoutBasePage from '@react-ssrex/ui/build/WebappLayout/LayoutBasePage';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function HomePage() {
  return (
    <LayoutBasePage>
      <Card>
        <CardContent>
          Home Page
        </CardContent>
      </Card>
    </LayoutBasePage>
  );
}

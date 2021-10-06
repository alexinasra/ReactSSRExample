import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { gql, useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import createTheme from './createTheme';
import createEmotionCache from './createEmotionCache';

const THEME_SETTINGS = gql`
query ThemeSettingsQuery{
  themeSettings @client
}
`;

export default function InitTheme({ children }) {
  const { i18n } = useTranslation();
  const { data } = useQuery(THEME_SETTINGS);
  const [direction, setDirection] = React.useState(i18n.dir());

  React.useEffect(() => {
    i18n.on('languageChanged', (lng) => {
      setDirection(i18n.dir(lng));
    });
  }, [i18n]);

  const theme = React.useMemo(() => {
    if (data && data.themeSettings) {
      return {
        name: data.themeSettings.name,
        mode: data.themeSettings.mode,
      };
    }

    return {
      name: 'default',
      mode: 'light',
    };
  }, [data]);

  return (
    <CacheProvider value={createEmotionCache(direction)}>
      <ThemeProvider theme={createTheme(theme.name, theme.mode, direction)}>
        {children}
      </ThemeProvider>
    </CacheProvider>

  );
}

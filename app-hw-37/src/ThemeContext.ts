import React from 'react';

export const ThemeContext = React.createContext('light');
export const ChangeThemeContext = React.createContext((btnValue: 'light' | 'dark') => { })

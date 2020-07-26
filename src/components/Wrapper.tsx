import React from 'react';

import { useStyletron } from 'baseui';

const Wrapper: React.FC = ({children}) => {
  const [useCss, theme] = useStyletron();

  return (
    <div className={useCss({
      height: '100vh',
      width: '95vw',
      backgroundColor: theme.colors.backgroundPrimary,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    })}>
      {children}
    </div>
  )
}

export default Wrapper;
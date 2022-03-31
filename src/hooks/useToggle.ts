import * as React from 'react';

export const useToggle = (initialValue = false) => {
  const [value, setValue] = React.useState<boolean>(initialValue);

  const toggleValue = React.useCallback(() => {
    setValue(prevValue => !prevValue);
  }, []);

  return [value, toggleValue, setValue] as const;
};

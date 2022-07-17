import React from 'react';
import * as icons from '@mui/icons-material';
import {ButtonProps} from '@mui/material';

export type MyIconProps = {
  color?: ButtonProps['color'];
  icon?: keyof typeof icons;
  variant?: ButtonProps['variant'];
};

const MyIcon = ({color, icon, variant}: MyIconProps) => {
  if (icon) {
    const Icon = icons[icon];
    return (
      <Icon
        sx={{
          color: () => {
            if (!color && !variant) {
              return 'primary';
            }
            if (!color && variant === 'contained') {
              return '#fff';
            }
            return color;
          },
        }}
      />
    );
  }
  return <></>;
};

export default MyIcon;

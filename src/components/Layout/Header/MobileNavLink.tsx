import React, {useCallback, useState} from 'react';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  styled,
} from '@mui/material';
import {useRouter} from 'next/router';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

type Props = {
  route: MyRoute;
};

const MobileNavLink = ({route}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {push, asPath} = useRouter();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, path?: string) => {
      if (!path) {
        setIsOpen((old) => !old);
      } else {
        push(path);
      }
    },
    [push]
  );

  return (
    <>
      <LinkButton
        onClick={(e) => handleClick(e, route.path)}
        isActive={asPath === route.path}
      >
        <ListItemText primary={route.label} />
        {!!route.submenu && (isOpen ? <ExpandLess /> : <ExpandMore />)}
      </LinkButton>
      {!!route.submenu && !!route.submenu.length && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {route.submenu.map((el) => (
              <LinkButton
                key={el.path}
                isActive={asPath === el.path}
                onClick={(e) => handleClick(e, el.path)}
                sx={{paddingLeft: '35px'}}
              >
                <ListItemText primary={el.label} />
              </LinkButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default MobileNavLink;

export const LinkButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{isActive: boolean}>(({theme, isActive}) => ({
  fontSize: '15px',
  fontWeight: '300',
  padding: '10px 15px',
  height: 'auto',
  ...(isActive
    ? {color: theme.palette.primary.main}
    : {color: theme.palette.text.secondary}),

  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

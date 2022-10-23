import React, {useCallback, useState} from 'react';
import {Button, Menu, MenuItem, styled} from '@mui/material';
import Link from 'next/link';
import {useRouter} from 'next/router';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

type Props = {
  route: MyRoute;
};

const DesktopNavLink = ({route}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const {push, asPath} = useRouter();

  const handleClick = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement | HTMLLIElement>,
      path?: string
    ) => {
      if (!path) {
        setAnchorEl(event.currentTarget);
      } else {
        setAnchorEl(undefined);
        push(path);
      }
    },
    [push]
  );

  return (
    <>
      <LinkButton
        id={`${route.label}-nav-link`}
        aria-controls={!!anchorEl ? 'nav-submenu' : undefined}
        aria-haspopup="true"
        aria-expanded={!!anchorEl ? 'true' : undefined}
        onClick={(e) => handleClick(e, route.path)}
        endIcon={
          !!route.submenu ? (
            !!anchorEl ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : undefined
        }
        isActive={!!anchorEl || asPath === route.path}
      >
        {route.label}
      </LinkButton>
      {!!route.submenu && (
        <Menu
          id={`${route.label}-submenu`}
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={() => setAnchorEl(undefined)}
          MenuListProps={{
            'aria-labelledby': `${route.label}-nav-link`,
          }}
          sx={{
            '& .MuiPaper-root': {
              marginTop: '10px',
              borderRadius: '4px',
              boxShadow: '0 5px 20px 5px rgb(35 38 58 / 10%)',
              '& .MuiList-root': {
                minWidth: '200px',
                padding: '0',
              },
            },
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {route.submenu.map((el) => (
            <Link href={el.path} key={el.label + '-nav-link'}>
              <StyledMenuItem
                isActive={asPath === el.path}
                onClick={(e) => handleClick(e, el.path)}
              >
                {el.label}
              </StyledMenuItem>
            </Link>
          ))}
        </Menu>
      )}
    </>
  );
};

export default DesktopNavLink;

const LinkButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{isActive: boolean}>(({theme, isActive}) => ({
  fontSize: '15px',
  fontWeight: '300',
  padding: '2px 15px',
  height: 'auto',
  marginLeft: '10px',
  ...(isActive
    ? {color: theme.palette.primary.main}
    : {color: theme.palette.text.secondary}),

  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export const StyledMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{isActive: boolean}>(({theme, isActive}) => ({
  padding: ' 10px 15px',
  ...(isActive
    ? {color: theme.palette.primary.main}
    : {color: theme.palette.text.secondary}),
  '&:hover': {
    background: 'transparent',
    color: theme.palette.primary.main,
  },
}));

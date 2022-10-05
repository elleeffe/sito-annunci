import {ChevronRight} from '@mui/icons-material';
import {Breadcrumbs, Stack, styled} from '@mui/material';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Subtitle1} from './MyTypography';

type Props = {
  paths: {label: string; path?: string}[];
};

const BreadCrumb = ({paths}: Props) => {
  const {asPath} = useRouter();

  return (
    <Stack spacing={2} marginTop="10px">
      <Breadcrumbs
        separator={<ChevronRight sx={{color: '#fff'}} />}
        aria-label="breadcrumb"
      >
        <Link href="/">
          <StyledLabel isWhite isActive={asPath === '/'}>
            Home
          </StyledLabel>
        </Link>
        {paths.map((el) => (
          <Link href={el.path || '/'} key={el.path}>
            <StyledLabel isWhite isActive={asPath === el.path}>
              {el.label}
            </StyledLabel>
          </Link>
        ))}
      </Breadcrumbs>
    </Stack>
  );
};

export default BreadCrumb;

const StyledLabel = styled(Subtitle1, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{isActive: boolean}>(({theme, isActive}) => ({
  cursor: 'pointer',
  textOverflow: 'ellipsis',

  '&:hover': {
    textDecoration: 'underline',
  },
  ...(isActive && {textDecoration: 'underline'}),

  [theme.breakpoints.down('md')]: {
    overflow: 'hidden',
    maxWidth: '550px',
    whiteSpace: 'nowrap',
  },

  [theme.breakpoints.down('sm')]: {
    maxWidth: '280px',
  },

  [theme.breakpoints.down('xs')]: {
    maxWidth: '280px',
  },
}));

import {ChevronRight} from '@mui/icons-material';
import {Breadcrumbs, Stack, styled} from '@mui/material';
import Link from 'next/link';
import {Subtitle1} from './MyTypography';

type Props = {
  paths: {label: string; path: string}[];
};

const BreadCrumb = ({paths}: Props) => {
  return (
    <Stack spacing={2} marginTop="10px">
      <Breadcrumbs
        separator={<ChevronRight sx={{color: '#fff'}} />}
        aria-label="breadcrumb"
      >
        <Link href="/">
          <StyledLabel isWhite>Home</StyledLabel>
        </Link>
        {paths.map((el) => (
          <Link href={el.path} key={el.path}>
            <StyledLabel isWhite>{el.label}</StyledLabel>
          </Link>
        ))}
      </Breadcrumbs>
    </Stack>
  );
};

export default BreadCrumb;

const StyledLabel = styled(Subtitle1)(() => ({
  cursor: 'pointer',

  '&:hover': {
    textDecoration: 'underline',
  },
}));

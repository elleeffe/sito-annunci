import {Box, Grid, Skeleton, styled} from '@mui/material';

type Props = {
  whiteBg?: boolean;
  spacingTop?: boolean;
};

const SkeletonCard = ({whiteBg, spacingTop}: Props) => {
  return (
    <Wrap
      container
      whiteBg={whiteBg}
      columnSpacing={2}
      rowSpacing={2}
      spacingTop={spacingTop}
    >
      <Cover item xs={12} md={5} lg={4}>
        <SkeletonCover variant="rectangular" />
      </Cover>
      <Content item xs={12} md={7} lg={8}>
        <Box>
          <Skeleton height={25} />
          <Skeleton height={25} />
          <Skeleton height={25} width="70%" />
        </Box>
        <Box>
          <Skeleton height={20} />
          <Skeleton height={20} width="85%" />
          <Skeleton height={20} />
          <Skeleton height={20} width="70%" />
        </Box>
      </Content>
    </Wrap>
  );
};

export default SkeletonCard;

const Wrap = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'whiteBg' && prop !== 'spacingTop',
})<{whiteBg?: boolean; spacingTop?: boolean}>(
  ({theme, whiteBg, spacingTop}) => ({
    borderRadius: '4px',
    width: '100%',
    transition: 'all 100ms linear',
    ...(spacingTop && {marginTop: '25px'}),
    marginLeft: 0,
    marginTop: 0,

    ...(whiteBg
      ? {
          background: '#fff',
        }
      : {
          background: '#F8FAFB',
        }),

    '& + &': {
      marginTop: '20px',
    },
  })
);

const Cover = styled(Grid)(({theme}) => ({
  borderRadius: '4px',
  height: '200px',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  paddingLeft: '0px !important',
  paddingTop: '0px !important',

  [theme.breakpoints.down('md')]: {
    height: '35vh',
    marginRight: '0px',
    marginBottom: '25px',
    minHeight: '380px',
  },

  [theme.breakpoints.down('sm')]: {
    height: '25vh',
    minHeight: '200px',
  },
}));

const SkeletonCover = styled(Skeleton)(() => ({
  borderRadius: '4px',
  width: '100%',
  height: '100%',
}));

const Content = styled(Grid)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingTop: '0px !important',

  [theme.breakpoints.down('md')]: {
    paddingLeft: '0px !important',
  },
}));

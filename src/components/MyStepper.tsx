import React, {useState} from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  styled,
  ButtonProps,
  IconButton,
  Box,
} from '@mui/material';
import {ArrowBack, ArrowForward} from '@mui/icons-material';
import MyButton from './MyButton';

type StepType = {
  label: string;
  screen: React.ReactNode;
  action?: () => void;
};

type Props = {
  steps: StepType[];
  final: {
    screen: React.ReactNode;
    action?: () => void | Promise<any>;
    button: {
      label: string;
      color?: ButtonProps['color'];
      disabled?: boolean;
      loading?: boolean;
      variant?: ButtonProps['variant'];
      size?: ButtonProps['size'];
    };
  };
};

const MyStepper = ({steps, final}: Props) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Wrap>
      <Stepper
        activeStep={activeStep}
        sx={{
          marginBottom: '25px',
        }}
      >
        {steps.map((step) => {
          const stepProps: {completed?: boolean} = {};
          return (
            <Step key={step.label} {...stepProps}>
              <StyledLabel color={final.button.color}>{step.label}</StyledLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        final.screen
      ) : (
        <React.Fragment>
          {steps[activeStep] && steps[activeStep].screen}
          <Box
            display="flex"
            alignItems="flex-end"
            justifyContent="space-between"
            flex={1}
          >
            <IconButton
              color={final.button.color || 'primary'}
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              <ArrowBack />
            </IconButton>
            {activeStep === steps.length - 1 ? (
              <MyButton
                onClick={final.action}
                disabled={final.button.disabled}
                variant={final.button.variant || 'contained'}
                color={final.button.color || 'primary'}
                size={final.button.size || 'medium'}
                loading={final.button.loading}
              >
                {final.button.label}
              </MyButton>
            ) : (
              <IconButton
                color={final.button.color || 'primary'}
                onClick={handleNext}
              >
                <ArrowForward />
              </IconButton>
            )}
          </Box>
        </React.Fragment>
      )}
    </Wrap>
  );
};

export default MyStepper;

const Wrap = styled(Box)(() => ({
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const StyledLabel = styled(StepLabel)<{color?: ButtonProps['color']}>(
  ({theme, color}) => ({
    textAlign: 'left',
    '& .MuiStepIcon-text': {
      fill: '#fff',
    },
    '& .MuiStepIcon-root.Mui-active': {
      ...(color && color !== 'inherit' && {color: theme.palette[color].main}),
    },
    '& .MuiStepIcon-root.Mui-completed': {
      ...(color && color !== 'inherit' && {color: theme.palette[color].main}),
    },
  })
);

import React, {useCallback, useMemo, useState} from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  styled,
  ButtonProps,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import {ArrowBack, ArrowForward} from '@mui/icons-material';
import MyButton from './MyButton';

type StepType = {
  label: string;
  screen: React.ReactNode;
  action?: () => void | Promise<any>;
  loading?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  button?: {
    label: string;
    disabled?: boolean;
    loading?: boolean;
  };
};

type Props = {
  buttonColor?: ButtonProps['color'];
  buttonSize?: ButtonProps['size'];
  buttonVariant?: ButtonProps['variant'];
  hideLabel?: boolean;
  alternativeLabel?: boolean;
  steps: StepType[];
  initialStep?: number;
  onChangeStep?: () => void;
  final: {
    show: boolean;
    screen: React.ReactNode;
  };
};

const MyStepper = ({
  alternativeLabel,
  steps,
  final,
  hideLabel,
  initialStep,
  onChangeStep,
  buttonColor = 'primary',
  buttonSize = 'medium',
  buttonVariant = 'contained',
}: Props) => {
  const [activeStep, setActiveStep] = useState<number>(() => initialStep || 0);

  const stepAction = useMemo(() => {
    const currentStep = steps[activeStep];
    if (!!currentStep) {
      return currentStep.action;
    }
    return undefined;
  }, [steps, activeStep]);

  const handleNext = useCallback(() => {
    stepAction && stepAction();
    onChangeStep && onChangeStep();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, [stepAction, onChangeStep]);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  return (
    <Wrap>
      <Stepper
        alternativeLabel={alternativeLabel}
        activeStep={activeStep}
        sx={{
          marginBottom: '25px',
        }}
      >
        {steps.map((step) => {
          const stepProps: {completed?: boolean} = {};
          return (
            <Step key={step.label} {...stepProps}>
              <StyledLabel color={buttonColor}>
                {!hideLabel && step.label}
              </StyledLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        final.show ? (
          final.screen
        ) : (
          steps[steps.length - 1].screen
        )
      ) : (
        <>
          {steps[activeStep] && steps[activeStep].screen}
          <Box
            display="flex"
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <Tooltip title="Indietro">
              <IconButton
                color={buttonColor}
                disabled={activeStep === 0}
                onClick={handleBack}
                size={buttonSize}
              >
                <ArrowBack />
              </IconButton>
            </Tooltip>
            {steps[activeStep] && steps[activeStep].button ? (
              <MyButton
                onClick={handleNext}
                variant={buttonVariant}
                color={buttonColor}
                size={buttonSize}
                disabled={steps[activeStep]?.button?.disabled}
              >
                {steps[activeStep]?.button?.label}
              </MyButton>
            ) : (
              <Tooltip title="Avanti">
                <IconButton
                  color={buttonColor}
                  onClick={handleNext}
                  size={buttonSize}
                  disabled={steps[activeStep].disabled}
                >
                  <ArrowForward />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </>
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

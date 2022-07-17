import {FieldMetaState} from 'react-final-form';
import validate from 'validate.js';

export const muiErrorConverter = (
  meta: FieldMetaState<string | number | undefined>
) => {
  const error = !!(
    (meta.touched && meta.error) ||
    (!meta.dirtySinceLastSubmit && meta.submitError)
  );

  const helperText = error && (meta.error || meta.submitError || 'Errore');

  return {error, helperText};
};

export const emailValidator = (value: string) =>
  validate.single(value, {
    email: {email: true, message: 'Email non valida'},
    presence: {
      presence: true,
      allowEmpty: false,
      message: 'Campo obbligatorio',
    },
  });

export const passwordValidator = (value: string) =>
  validate.single(value, {
    format: {
      pattern: '[a-zA-Z0-9!£?@#$%^&*à-ù]+',
      message: 'Carattere non valido',
    },
    presence: {
      presence: true,
      allowEmpty: false,
      message: 'Campo obbligatorio',
    },
    length: {
      minimum: 8,
      tooShort: 'La password deve contenere almeno 8 caratteri',
    },
  });

export const createPasswordValidator = (value: string) => {
  const check1 = passwordValidator(value);
  if (!!check1) {
    return check1;
  }
  if (value.search(/[A-Z]/) < 0) {
    return 'Inserire almeno una lettera maiuscola';
  }
  if (value.search(/[0-9]/) < 0) {
    return 'Inserire almeno un numero';
  }
  if (value.search(/[!£?@#$%^&*]/) < 0) {
    return 'Inserire almeno un carattere speciale';
  }
  return undefined;
};

export const isRequired = (value: string | Date | undefined) =>
  validate.single(value, {
    presence: {
      presence: true,
      allowEmpty: false,
      message: 'Campo obbligatorio',
    },
  });

export const numberValidator = (value: string, required: boolean) => {
  if (required) {
    return validate.single(value, {
      presence: {
        presence: true,
        allowEmpty: false,
        message: 'Campo obbligatorio',
      },
      numericality: {
        numericality: true,
        onlyInteger: false,
        greaterThan: 0,
        message: 'Carattere non valido',
      },
    });
  }

  return validate.single(value, {
    numericality: {
      numericality: true,
      onlyInteger: false,
      greaterThan: 0,
      message: 'Carattere non valido',
    },
  });
};

export const wordValidator = (value: string) =>
  validate.single(value, {
    presence: {
      presence: true,
      allowEmpty: false,
      message: 'Campo obbligatorio',
    },
    format: {
      pattern: '[a-zA-Zà-ù ]+',
      message: 'Carattere non valido',
    },
  });

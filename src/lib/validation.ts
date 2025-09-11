// Form validation utilities

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  customValidator?: (value: unknown) => string | null;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export class FormValidator {
  private rules: Record<string, ValidationRule> = {};
  private errorMessages: Record<string, string> = {
    required: 'Toto pole je povinné',
    minLength: 'Příliš krátký text (min. {min} znaků)',
    maxLength: 'Příliš dlouhý text (max. {max} znaků)',
    pattern: 'Neplatný formát',
    min: 'Hodnota je příliš nízká (min. {min})',
    max: 'Hodnota je příliš vysoká (max. {max})',
    email: 'Neplatná e-mailová adresa',
    url: 'Neplatná URL adresa',
    phone: 'Neplatné telefonní číslo',
    password: 'Heslo musí obsahovat alespoň 8 znaků, velké písmeno, číslici a speciální znak',
    passwordConfirm: 'Hesla se neshodují',
    crypto: 'Neplatná krypto adresa',
    number: 'Musí být číslo',
    positiveNumber: 'Musí být kladné číslo',
    integer: 'Musí být celé číslo'
  };

  constructor(customMessages?: Record<string, string>) {
    if (customMessages) {
      this.errorMessages = { ...this.errorMessages, ...customMessages };
    }
  }

  // Add validation rule for a field
  addRule(field: string, rule: ValidationRule): FormValidator {
    this.rules[field] = rule;
    return this;
  }

  // Add multiple rules at once
  addRules(rules: Record<string, ValidationRule>): FormValidator {
    this.rules = { ...this.rules, ...rules };
    return this;
  }

  // Validate a single field
  validateField(field: string, value: unknown): string | null {
    const rule = this.rules[field];
    if (!rule) return null;

    // Required validation
    if (rule.required && (value === undefined || value === null || value === '')) {
      return this.errorMessages.required;
    }

    // Skip other validations if value is empty and not required
    if (!rule.required && (value === undefined || value === null || value === '')) {
      return null;
    }

    // String validations
    if (typeof value === 'string') {
      if (rule.minLength && value.length < rule.minLength) {
        return this.errorMessages.minLength.replace('{min}', rule.minLength.toString());
      }
      if (rule.maxLength && value.length > rule.maxLength) {
        return this.errorMessages.maxLength.replace('{max}', rule.maxLength.toString());
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        return this.errorMessages.pattern;
      }
    }

    // Number validations
    if (typeof value === 'number') {
      if (rule.min !== undefined && value < rule.min) {
        return this.errorMessages.min.replace('{min}', rule.min.toString());
      }
      if (rule.max !== undefined && value > rule.max) {
        return this.errorMessages.max.replace('{max}', rule.max.toString());
      }
    }

    // Custom validator
    if (rule.customValidator) {
      return rule.customValidator(value);
    }

    return null;
  }

  // Validate entire form
  validateForm(data: Record<string, unknown>): FormValidationResult {
    const errors: ValidationError[] = [];

    for (const field in this.rules) {
      const error = this.validateField(field, data[field]);
      if (error) {
        errors.push({ field, message: error });
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Get error for specific field
  getFieldError(field: string, value: unknown): string | null {
    return this.validateField(field, value);
  }
}

// Pre-defined validation patterns
export const ValidationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(\+420\s?)?(\d{3}\s?\d{3}\s?\d{3}|\d{9})$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  ethereumAddress: /^0x[a-fA-F0-9]{40}$/,
  bitcoinAddress: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,87}$/,
  number: /^\d+(\.\d+)?$/,
  integer: /^\d+$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  alphanumericWithSpaces: /^[a-zA-Z0-9\s]+$/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
};

// Validation helpers
export const ValidationHelpers = {
  isEmail: (value: string): boolean => ValidationPatterns.email.test(value),
  isPhone: (value: string): boolean => ValidationPatterns.phone.test(value),
  isUrl: (value: string): boolean => ValidationPatterns.url.test(value),
  isStrongPassword: (value: string): boolean => {
    return value.length >= 8 && ValidationPatterns.password.test(value);
  },
  isEthereumAddress: (value: string): boolean => ValidationPatterns.ethereumAddress.test(value),
  isBitcoinAddress: (value: string): boolean => ValidationPatterns.bitcoinAddress.test(value),
  isNumber: (value: string): boolean => ValidationPatterns.number.test(value),
  isInteger: (value: string): boolean => ValidationPatterns.integer.test(value),
  isPositiveNumber: (value: number): boolean => typeof value === 'number' && value > 0,
  isEmpty: (value: unknown): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  }
};

// Custom validators
export const CustomValidators = {
  passwordConfirm: (password: string) => (confirmPassword: string): string | null => {
    return password === confirmPassword ? null : 'Hesla se neshodují';
  },

  minAmount: (min: number, currency = 'USD') => (value: number): string | null => {
    return value >= min ? null : `Minimální částka je ${min} ${currency}`;
  },

  maxAmount: (max: number, currency = 'USD') => (value: number): string | null => {
    return value <= max ? null : `Maximální částka je ${max} ${currency}`;
  },

  uniqueValue: (existingValues: unknown[]) => (value: unknown): string | null => {
    return existingValues.includes(value) ? 'Tato hodnota již existuje' : null;
  },

  fileSize: (maxSizeMB: number) => (file: File): string | null => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes ? null : `Soubor je příliš velký (max. ${maxSizeMB}MB)`;
  },

  fileType: (allowedTypes: string[]) => (file: File): string | null => {
    return allowedTypes.includes(file.type) ? null : `Nepodporovaný typ souboru`;
  },

  cryptoAddress: (type: 'ethereum' | 'bitcoin') => (address: string): string | null => {
    const pattern = type === 'ethereum' ? ValidationPatterns.ethereumAddress : ValidationPatterns.bitcoinAddress;
    return pattern.test(address) ? null : `Neplatná ${type} adresa`;
  },

  dateRange: (minDate?: Date, maxDate?: Date) => (date: Date): string | null => {
    if (minDate && date < minDate) {
      return `Datum musí být po ${minDate.toLocaleDateString('cs-CZ')}`;
    }
    if (maxDate && date > maxDate) {
      return `Datum musí být před ${maxDate.toLocaleDateString('cs-CZ')}`;
    }
    return null;
  },

  jsonSchema: () => (value: unknown): string | null => {
    // Simplified JSON schema validation - in real app use ajv or similar
    try {
      JSON.stringify(value);
      return null;
    } catch {
      return 'Neplatný JSON formát';
    }
  }
};

// Form validation hook
export function useFormValidation(rules: Record<string, ValidationRule>) {
  const validator = new FormValidator();
  validator.addRules(rules);

  const validateField = (field: string, value: unknown): string | null => {
    return validator.validateField(field, value);
  };

  const validateForm = (data: Record<string, unknown>): FormValidationResult => {
    return validator.validateForm(data);
  };

  return {
    validateField,
    validateForm,
    validator
  };
}

// Ready-to-use validation rules
export const CommonValidationRules = {
  email: {
    required: true,
    pattern: ValidationPatterns.email,
    customValidator: (value: string) => ValidationHelpers.isEmail(value) ? null : 'Neplatná e-mailová adresa'
  },

  password: {
    required: true,
    minLength: 8,
    customValidator: (value: string) => ValidationHelpers.isStrongPassword(value) ? null : 'Heslo musí obsahovat alespoň 8 znaků, velké písmeno, číslici a speciální znak'
  },

  phone: {
    pattern: ValidationPatterns.phone,
    customValidator: (value: string) => !value || ValidationHelpers.isPhone(value) ? null : 'Neplatné telefonní číslo'
  },

  requiredText: {
    required: true,
    minLength: 1
  },

  optionalText: {
    required: false,
    maxLength: 500
  },

  positiveNumber: {
    required: true,
    min: 0.01,
    customValidator: (value: number) => ValidationHelpers.isPositiveNumber(value) ? null : 'Musí být kladné číslo'
  },

  ethereumAddress: {
    required: true,
    pattern: ValidationPatterns.ethereumAddress,
    customValidator: (value: string) => ValidationHelpers.isEthereumAddress(value) ? null : 'Neplatná Ethereum adresa'
  },

  url: {
    pattern: ValidationPatterns.url,
    customValidator: (value: string) => !value || ValidationHelpers.isUrl(value) ? null : 'Neplatná URL adresa'
  }
};

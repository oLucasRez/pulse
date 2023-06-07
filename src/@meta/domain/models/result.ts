import { DomainError } from '@common/domain/errors';

type Props<ValueType, ErrorType extends DomainError> = {
  value?: ValueType;
  error?: ErrorType;
};

type Class<Type> = new (...args: any[]) => Type;

export class Result<ValueType, ErrorType extends DomainError> {
  public readonly value: ValueType;
  public readonly error: ErrorType;

  private constructor(props: Props<ValueType, ErrorType>) {
    if ('value' in props) this.value = props.value;
    if ('error' in props) this.error = props.error;
  }

  public static resolve<ValueType, ErrorType extends DomainError>(
    value: ValueType,
  ): Result<ValueType, ErrorType> {
    return new Result({ value });
  }

  public static reject<ValueType, ErrorType extends DomainError>(
    error: ErrorType,
  ): Result<ValueType, ErrorType> {
    return new Result({ error });
  }

  public then(
    callback: (value: ValueType) => any,
  ): Result<ValueType, ErrorType> {
    if (this.value) callback(this.value);

    return this;
  }

  public catch<SpecificErrorType extends ErrorType>(
    errorClass: Class<SpecificErrorType>,
    callback: (error: SpecificErrorType) => any,
  ): Result<ValueType, ErrorType> {
    if (this.error instanceof errorClass)
      return callback(this.error as SpecificErrorType);

    return this;
  }
}

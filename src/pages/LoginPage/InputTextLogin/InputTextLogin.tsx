import classNames from "classnames";
import React, { LegacyRef, RefObject } from "react";
import "./InputTextLogin.scss";

interface InputTextAction {
  name?: string;
  action?: () => void;
}

export interface InputTextProps {
  label?: string;
  isRequired?: boolean;
  floatLabel?: boolean;
  isMaterial?: boolean;
  prefix?: string | JSX.Element;
  suffix?: string | JSX.Element;
  value?: string;
  disabled?: boolean;
  placeHolder?: string;
  className?: string;
  showCount?: boolean;
  maxLength?: number;
  isSmall?: boolean;
  action?: InputTextAction;
  nameAttr?: string;
  onChange?: (T: string | null) => void;
  onEnter?: (event?: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (T: string | null) => void;
  inputType?: string;
  style?: React.CSSProperties;
}

const InputTextLogin = React.forwardRef(function InputTextLogin(
  props: InputTextProps,
  ref: LegacyRef<HTMLDivElement>
) {
  const {
    action,
    suffix,
    maxLength,
    disabled,
    placeHolder,
    className,
    isSmall,
    onChange,
    onEnter,
    onBlur,
    label,
    isRequired,
    inputType,
    style,
    nameAttr,
  } = props;

  const [internalValue, setInternalValue] = React.useState<string>("");

  const inputRef: RefObject<HTMLInputElement> =
    React.useRef<HTMLInputElement>(null);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!maxLength || (maxLength && event.target.value.length <= maxLength)) {
        setInternalValue(event.target.value);
        if (typeof onChange === "function") {
          onChange(event.target.value);
        }
      }
    },
    [onChange, maxLength]
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        if (typeof onEnter === "function") {
          onEnter(event);
        }
      }
    },
    [onEnter]
  );

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (typeof onBlur === "function") {
        onBlur(event.currentTarget.value);
      }
    },
    [onBlur]
  );

  return (
    <div className={classNames("input-login__wrapper", className)}>
      <div className="input-login__label m-b--3xs">
        {label && (
          <label
            className={classNames("component__title", {
              "component__title--disabled": disabled,
            })}
          >
            {label}
            {isRequired && <span className="text-danger">&nbsp;*</span>}
          </label>
        )}

        {action && (
          <span
            className="m-l--3xs color-action"
            style={{ cursor: "pointer" }}
            onClick={action.action}
          >
            {action.name}
          </span>
        )}
      </div>
      <div
        className={classNames("component__input input-login__container", {
          "input-login__container--sm": isSmall,
          "p-y--2xs": isSmall,
          "p-x--xs": isSmall,
          "p--xs": !isSmall,
          "input-login--material": true,
          "input-login--disabled ": disabled,
        })}
        ref={ref}
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        <input
          type={inputType}
          value={internalValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={placeHolder}
          ref={inputRef}
          disabled={disabled}
          className={classNames("component__input", {
            "disabled-field": disabled,
          })}
          style={style}
          name={nameAttr}
          autoComplete="on"
        />
        {suffix && (
          <>
            {typeof suffix === "string" ? (
              <span className="body-text--md m-l--2xs">{suffix}</span>
            ) : (
              <div className="m-l--2xs input-login__icon">{suffix}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default InputTextLogin;

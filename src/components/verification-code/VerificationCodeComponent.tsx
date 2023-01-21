import React, { useState } from "react";
import PropTypes from "prop-types";

const KEY_CODE = {
  backspace: 8,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

let iRefs: React.RefObject<HTMLInputElement>[] = [
  React.createRef(),
  React.createRef(),
  React.createRef(),
  React.createRef(),
  React.createRef(),
  React.createRef(),
];
let id = +new Date();
export const VerificationCodeComponent: React.FC<{
  id: string;
  type: "number" | any;
  fields: number;
  fieldWidth: number;
  fieldHeight: number;
  autoFocus: boolean;
  onChange: Function;
  onComplete: Function;
}> = (props) => {
  const [state, setState] = useState<{
    values: string[];
    autoFocusIndex: number;
  }>({
    values: Array(props.fields).fill(""),
    autoFocusIndex: 0,
  });

  const triggerChange = (values = state.values) => {
    const { onChange, onComplete, fields } = props;
    const val = values.join("");
    onChange && onChange(val);
    if (onComplete && val.length >= fields) {
      onComplete(val);
    }
  };

  const onChange = (e: any) => {
    const index = parseInt(e.target.dataset.id);

    e.target.value = e.target.value.replace(/[^\d]/gi, "");

    // this.handleKeys[index] = false;
    if (!e.target.validity.valid) {
      return;
    }
    const { fields } = props;
    let next: React.RefObject<HTMLInputElement>;
    const value = e.target.value;
    let { values } = state;
    values = Object.assign([], values);
    if (value.length > 1) {
      let nextIndex = value.length + index - 1;
      if (nextIndex >= fields) {
        nextIndex = fields - 1;
      }
      next = iRefs[nextIndex];
      const split = value.split("");
      split.forEach((item: any, i: number) => {
        const cursor = index + i;
        if (cursor < fields) {
          values[cursor] = item;
        }
      });
      setState((prevValues) => ({ ...prevValues, values }));
    } else {
      next = iRefs[index + 1];
      values[index] = value;
      setState((prevValues) => ({ ...prevValues, values }));
    }

    if (next && next.current) {
      next.current.focus();
      next.current.select();
    }

    triggerChange(values);
  };

  const onKeyDown = (e: any) => {
    const index = parseInt(e.target.dataset.id);
    const prevIndex = index - 1;
    const nextIndex = index + 1;
    const prev: any = iRefs[prevIndex];
    const next: any = iRefs[nextIndex];
    switch (e.keyCode) {
      case KEY_CODE.backspace:
        e.preventDefault();
        const vals = [...state.values];
        if (state.values[index]) {
          vals[index] = "";
          setState((prevValues) => ({ ...prevValues, values: vals }));
          triggerChange(vals);
        } else if (prev) {
          vals[prevIndex] = "";
          prev.current.focus();
          setState((prevValues) => ({ ...prevValues, values: vals }));
          triggerChange(vals);
        }
        break;
      case KEY_CODE.left:
        e.preventDefault();
        if (prev) {
          prev.current.focus();
        }
        break;
      case KEY_CODE.right:
        e.preventDefault();
        if (next) {
          next.current.focus();
        }
        break;

      default:
        // this.handleKeys[index] = true;
        break;
    }
  };

  const onFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const { fieldHeight, fieldWidth, fields, autoFocus, type } = props;

  return (
    <div>
      <div>
        {state.values.map((value, index) => (
          <input
            type={type === "number" ? "tel" : type}
            pattern={"[0-9]*"}
            autoFocus={autoFocus && index === state.autoFocusIndex}
            style={{
              width: fieldWidth,
              height: fieldHeight,
            }}
            key={`${id}-${index}`}
            data-id={index}
            value={value}
            id={id ? `${props.id}-${index}` : undefined}
            ref={iRefs[index]}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            required={true}
          />
        ))}
      </div>
    </div>
  );
};

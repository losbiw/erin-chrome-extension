import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'ref' | 'as'> & {
  label: string;
};

const Label = styled.p`
  margin: 20px 0 5px;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: rgb(194, 196, 207);
`;

const Field = styled.input`
  margin-top: 3px;
  width: 389px;
  height: 40px;
  padding: 10px 18px;
  border-radius: 4px;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.01em;
  background: rgb(30, 32, 41);
  border: 1px solid rgb(94, 97, 117);
  color: rgb(194, 196, 207);
`;

const Input: FC<Props> = (props: Props) => (
  <div>
    {/* eslint-disable-next-line react/destructuring-assignment */}
    <Label>{props.label}</Label>
    <Field {...props} />
  </div>
);

export default Input;

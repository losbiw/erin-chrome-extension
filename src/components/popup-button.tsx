import React, { FC } from 'react';
import styled from 'styled-components';

interface Props {
  handleClose: () => void;
  handleSave: () => void;
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
`;

const Button = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 10px;
  font-size: 11px;
  min-width: 88px;
  border-radius: 16px;
  line-height: 1;
  cursor: pointer;
  box-sizing: border-box;
`;

const Cancel = styled(Button)`
  background: transparent;
  border: 1px solid #c2c4cf;
  color: #c2c4cf;
  transition: 0.1s;

  :hover {
    color: #FFFFFF;
    border-color: #FFFFFF;
  }
`;

const Save = styled(Button)`
  background: #FB542B;
  border: 1px solid #FB542B;
  color: #FFFFFF;
  transition: 0.15s;
  margin-left: 10px;

  :hover {
    transform: scale(1.08);
  }
`;

const PopupButtons: FC<Props> = ({ handleClose, handleSave }: Props) => (
  <Container>
    <Cancel onClick={handleClose}>Cancel</Cancel>
    <Save onClick={handleSave}>Save</Save>
  </Container>
);

export default PopupButtons;

import React, { FC } from 'react';
import styled from 'styled-components';
import { ReactComponent as Pen } from '../assets/icons/pen.svg';

interface Props {
  isVisible: boolean;
  openMenu: () => void;
}

type ContainerProps = Pick<Props, 'isVisible'>;

const Container = styled.div<ContainerProps>`
  display: flex;
  position: absolute;
  width: 40px;
  height: 40px;
  top: -12px;
  right: -12px;
  transition: opacity 0.15s linear 0s;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`;

const Button = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: padding-box rgb(218, 220, 235);
  border-radius: 50%;
  padding: 1px 6px;
  outline: unset;
  border: solid 4px transparent;
  cursor: pointer;
`;

const Edit: FC<Props> = ({ openMenu, isVisible }: Props) => (
  <Container
    className="edit"
    isVisible={isVisible}
    onClick={(e) => {
      e.preventDefault();
      openMenu();
    }}
  >
    <Button>
      <Pen />
    </Button>
  </Container>
);

export default Edit;

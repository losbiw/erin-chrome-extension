import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as Pen } from '../assets/icons/pen.svg';
import { ReactComponent as Trash } from '../assets/icons/trash.svg';

interface Props {
  closeMenu: () => void;
  removeCurrentEntry: () => void;
  editCurrentEntry: () => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(59, 62, 79);
  position: absolute;
  top: 15px;
  left: 80px;
  min-width: 175px;
  padding: 8px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 16px 0px;
  z-index: 2;
  cursor: auto;
`;

const SVGContainer = styled.div`
  width: 14px;
  height: 14px;
  margin-right: 11px;

  svg {
    width: inherit;
    height: inherit;

    path {
      fill: white;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.01em;
  border: none;
  padding: 5px 13px;
  background: inherit;
  display: flex;
  outline: unset;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  color: rgb(255, 255, 255);
  transition: .05s;
  border-radius: 4px;

  :hover {
    background-color: rgb(76, 84, 210);
  }
`;

const EditMenu: FC<Props> = ({
  removeCurrentEntry, editCurrentEntry, closeMenu,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      const container = containerRef.current;

      if (container !== target && !container?.contains(target as HTMLElement)) {
        closeMenu();
      }
    };

    document.addEventListener('click', clickHandler);

    return () => document.removeEventListener('click', clickHandler);
  }, []);

  return (
    <Container ref={containerRef} onClick={(e) => e.preventDefault()}>
      <Button onClick={editCurrentEntry}>
        <SVGContainer>
          <Pen viewBox="0 0 16 16" />
        </SVGContainer>
        Edit
      </Button>

      <Button onClick={removeCurrentEntry}>
        <SVGContainer>
          <Trash viewBox="0 0 16 16" />
        </SVGContainer>
        Delete
      </Button>
    </Container>
  );
};

export default EditMenu;

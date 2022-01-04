import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Link from '../types/link';
import Edit from './edit';
import EditMenu from './edit-menu';

interface Props extends Link {
  index: number;
  removeEntry: (index: number) => void;
  editEntry: (index: number) => void;
}

export const TileContainer = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 78px;
  height: 110px;
  gap: 8px;
  cursor: pointer;
  position: relative;
  text-decoration: none;

  :hover .edit {
    opacity: 1;
    visibility: visible;
  }
`;

const Icon = styled.img`
  display: block;
  box-sizing: border-box;
  background-color: rgb(30, 32, 41);
  border-radius: 8px;
  padding: 16px;
  width: 70px;
  height: 70px;
  object-fit: contain;
  box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px 0px;
`;

export const TileTitle = styled.p`
  font-size: 11px;
  line-height: 17px;
  color: white;
  padding: 0 2px;
  margin: 0;
  font-weight: 400;
  text-shadow: 0 3px 12px rgba(0,0,0, 0.2);
`;

const Tile: FC<Props> = ({
  url, title, index, removeEntry, editEntry,
}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <TileContainer href={url}>
      <Icon src={`chrome://favicon/size/64@1x/${url}`} />
      <TileTitle>{title}</TileTitle>
      <Edit isVisible={isMenuOpen} openMenu={() => setIsMenuOpen(true)} />

      {isMenuOpen && (
        <EditMenu
          removeCurrentEntry={() => removeEntry(index)}
          editCurrentEntry={() => {
            setIsMenuOpen(false);
            editEntry(index);
          }}
          closeMenu={() => setIsMenuOpen(false)}
        />
      )}
    </TileContainer>
  );
};

export default Tile;

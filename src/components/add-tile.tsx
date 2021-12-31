import React, { FC } from 'react';
import styled from 'styled-components';
import { TileContainer, TileTitle } from './tile';
import { ReactComponent as Plus } from '../assets/icons/plus.svg';

interface Props {
  openPopup: () => void;
}

const Square = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .1s;

  :hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const AddTile: FC<Props> = ({ openPopup }: Props) => (
  <TileContainer onClick={openPopup}>
    <Square>
      <Plus />
    </Square>

    <TileTitle>Add site</TileTitle>
  </TileContainer>
);

export default AddTile;

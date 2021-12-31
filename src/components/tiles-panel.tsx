import React, { FC } from 'react';
import styled from 'styled-components';
import Tile from './tile';
import Link from '../types/link';
import AddTile from './add-tile';

interface Props {
  entries: Link[];
  openPopup: () => void;
  removeEntry: (index: number) => void;
  editEntry: (index: number) => void;
}

const Container = styled.div`
  z-index: 1;
  justify-self: start;
  align-items: normal;
  display: grid;
  grid-template-columns: repeat(6, 86px);
  justify-content: var(--ntp-item-justify,start);
  padding: 24px 56px 24px 24px;

  @media screen and (max-width: 700px)
    grid-template-columns: repeat(3, 86);
  }
`;

const Tiles: FC<Props> = ({
  entries, openPopup, removeEntry, editEntry,
}: Props) => (
  <Container>
    {
      entries.map(({ href, title }, index) => (
        <Tile
          href={href}
          title={title}
          removeEntry={removeEntry}
          editEntry={editEntry}
          // eslint-disable-next-line react/no-array-index-key
          key={`${href}${title}${index}`}
          index={index}
        />
      ))
    }

    <AddTile openPopup={openPopup} />
  </Container>
);

export default Tiles;

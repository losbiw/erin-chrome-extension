import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Tile from './tile';
import Link from '../types/link';
import AddTile from './add-tile';

interface Props {
  entries: Link[];
  openPopup: () => void;
  removeEntry: (index: number) => void;
  editEntry: (index: number) => void;
  switchEntries: (initIndex: number, endIndex: number) => void;
}

type ListProps = Props & {
  isAddButtonShown: boolean;
};

type ItemProps = Link & Omit<Props, 'entries' | 'openPopup' | 'switchEntries'> & {
  itemIndex: number;
};

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

const SortableItem = SortableElement(({
  url, title, removeEntry, editEntry, itemIndex,
}: ItemProps) => (
  <Tile
    url={url}
    title={title}
    removeEntry={removeEntry}
    editEntry={editEntry}
    index={itemIndex}
  />
));

const SortableList = SortableContainer(({
  entries, removeEntry, editEntry, openPopup, isAddButtonShown,
}: ListProps) => (
  <Container>
    {
      entries.map(({ url, title }, index) => (
        <SortableItem
          url={url}
          title={title}
          itemIndex={index}
          removeEntry={removeEntry}
          editEntry={editEntry}
          index={index}
          // eslint-disable-next-line react/no-array-index-key
          key={`${url}${title}${index}`}
        />
      ))
    }

    { isAddButtonShown && <AddTile openPopup={openPopup} /> }
  </Container>
));

const Tiles: FC<Props> = (props: Props) => {
  const { switchEntries } = props;
  const [isAddButtonShown, setIsAddButtonShown] = useState(true);

  return (
    <SortableList
      {...props}
      isAddButtonShown={isAddButtonShown}
      onSortStart={() => setIsAddButtonShown(false)}
      onSortEnd={({ newIndex, oldIndex }) => {
        setIsAddButtonShown(true);
        switchEntries(newIndex, oldIndex);
      }}
      axis="xy"
      distance={2}
      lockToContainerEdges
    />
  );
};

export default Tiles;

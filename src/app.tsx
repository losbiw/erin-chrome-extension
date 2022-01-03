import React, {
  FC, useState, useCallback, useEffect,
} from 'react';
import styled from 'styled-components';
import EditPopup from './components/edit-popup';
import TilesPanel from './components/tiles-panel';
import Link from './types/link';

const Container = styled.div`
  height: 100vh;
  box-sizing: border-box;
  padding: 12px;
  margin: 0;
  background: url('https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=2000');
  background-size: cover;
  background-position: center;
`;

const rawState = localStorage.getItem('link-entries');

const App: FC = () => {
  const [links, setLinks] = useState(rawState ? JSON.parse(rawState) as Link[] : []);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editedItemIndex, setEditedItemIndex] = useState<number | undefined>(undefined);

  const addEntry = useCallback((entry: Link) => {
    setLinks([...links, entry]);
  }, [links]);

  const changeEntry = useCallback((updatedEntry: Link, index: number) => {
    const linksCopy = [...links];
    linksCopy[index] = updatedEntry;

    setLinks(linksCopy);
  }, [links]);

  const removeEntry = useCallback((index: number) => {
    const copy = [...links];
    copy.splice(index, 1);

    setLinks(copy);
  }, [links]);

  const switchEntries = useCallback((initialIndex: number, endIndex: number) => {
    const copy = [...links];

    const replacement = copy[initialIndex];
    copy[initialIndex] = copy[endIndex];
    copy[endIndex] = replacement;

    setLinks(copy);
  }, [links]);

  useEffect(() => {
    const json = JSON.stringify(links);
    localStorage.setItem('link-entries', json);
  }, [links]);

  return (
    <div className="App">
      { isPopupOpen
        && (
        <EditPopup
          {...links[editedItemIndex as number] || {}}
          editedIndex={editedItemIndex}
          closePopup={() => {
            setIsPopupOpen(false);
            setEditedItemIndex(undefined);
          }}
          addEntry={addEntry}
          changeEntry={changeEntry}
        />
        )}

      <Container>
        <TilesPanel
          entries={links}
          openPopup={() => setIsPopupOpen(true)}
          removeEntry={removeEntry}
          switchEntries={switchEntries}
          editEntry={(index: number) => {
            setEditedItemIndex(index);
            setIsPopupOpen(true);
          }}
        />
      </Container>
    </div>
  );
};

export default App;

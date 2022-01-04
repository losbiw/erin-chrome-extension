import React, {
  FC, useState, useCallback, useEffect,
} from 'react';
import styled from 'styled-components';
import EditPopup from './components/edit-popup';
import TilesPanel from './components/tiles-panel';
import { LINK_ENTRIES } from './constants/local-storage-keys';
import wallpaper from './helpers/wallpaper';
import Link from './types/link';

interface ContainerProps {
  wallpaperURL: string | undefined;
}

const Container = styled.div<ContainerProps>`
  height: 100vh;
  box-sizing: border-box;
  padding: 12px;
  margin: 0;
  ${({ wallpaperURL }) => (wallpaperURL ? `background: url(${wallpaperURL})` : '')};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-start;
  justift-content: flex-start;

  @media (max-width: 870px) {
    justify-content: center;
  }
`;

const rawState = localStorage.getItem(LINK_ENTRIES);

const App: FC = () => {
  const [links, setLinks] = useState(rawState ? JSON.parse(rawState) as Link[] : []);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editedItemIndex, setEditedItemIndex] = useState<number | undefined>(undefined);
  const [wallpaperURL, setWallpaperURL] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getWallpaper = async () => {
      const url = await wallpaper.getURL('new york'); // TODO: remove static query

      setWallpaperURL(url.src);
    };

    getWallpaper();
  }, []);

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

  const switchEntries = useCallback((newIndex: number, oldIndex: number) => {
    const copy = [...links];

    const dragged = copy[oldIndex];
    copy.splice(oldIndex, 1);
    copy.splice(newIndex, 0, dragged);

    setLinks(copy);
  }, [links]);

  useEffect(() => {
    const json = JSON.stringify(links);
    localStorage.setItem(LINK_ENTRIES, json);
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

      <Container wallpaperURL={wallpaperURL}>
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

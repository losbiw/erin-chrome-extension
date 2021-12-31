import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import Link from '../types/link';
import Input from './input';
import { ReactComponent as Cross } from '../assets/icons/cross.svg';
import PopupButtons from './popup-button';

type Props = Partial<Link> & {
  editedIndex: number | undefined;
  closePopup: () => void;
  addEntry: (entry: Link) => void;
  changeEntry: (entry: Link, index: number) => void;
};

const PopupContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
`;

const Popup = styled.div`
  box-shadow: rgb(0 0 0 / 20%) 0px 4px 12px 0px;
  position: relative;
  width: 437px;
  top: -50px;
  background-color: rgb(30, 32, 41);
  border-radius: 4px;
  padding: 34px 24px 24px;
  display: flex;
  flex-direction: column;
  z-index: 3;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: rgb(240, 242, 255);
  margin: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  display: flex;
  justify-content: center;
  align-item: center;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 50%;
  outline: none;
  transition: background 0.12s ease-in-out 0s, box-shadow 0.12s ease-in-out 0s;

  :hover {
    background: rgba(255, 255, 255, 0.3);
  }

  svg {
    fill: rgb(194, 196, 207);
  }
`;

const EditPopup: FC<Props> = ({
  url: defaultUrl, title: defaultTitle, editedIndex, closePopup, addEntry, changeEntry,
}: Props) => {
  const [title, setTitle] = useState(defaultTitle);
  const [url, setUrl] = useState(defaultUrl);

  const handleSave = useCallback(() => {
    if (!url) {
      closePopup();
      return;
    }

    // TODO: validate URLs to have https

    const validatedUrl = encodeURIComponent(url);

    const entry: Link = {
      title: title || url,
      url,
    };

    if (editedIndex !== undefined) {
      changeEntry(entry, editedIndex);
    } else {
      addEntry(entry);
    }

    closePopup();
  }, [title, url]);

  useEffect(() => {
    const hotkeyHandle = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSave();
      } else if (e.key === 'Esc' || e.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('keydown', hotkeyHandle);

    return () => document.removeEventListener('keydown', hotkeyHandle);
  }, [handleSave]);

  return (
    <PopupContainer>
      <Overlay onClick={closePopup} />

      <Popup>
        <CloseButton onClick={closePopup}>
          <Cross />
        </CloseButton>

        <Title>Edit site</Title>

        <Input
          label="Name"
          defaultValue={defaultTitle}
          placeholder="Website title"
          onChange={({ target: { value } }) => setTitle(value)}
        />

        <Input
          label="URL"
          defaultValue={defaultUrl}
          placeholder="Website address"
          onChange={({ target: { value } }) => setUrl(value)}
        />

        <PopupButtons handleClose={closePopup} handleSave={handleSave} />
      </Popup>
    </PopupContainer>
  );
};

export default EditPopup;

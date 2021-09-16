import React, { useState } from 'react';
import { Button, Icons, Separator, P } from '@storybook/components';
import { styled } from '@storybook/theming';
import { transparentize } from 'polished';
import { CallState, CallStates } from '../../types';
import { StatusBadge } from '../StatusBadge/StatusBadge';

const StyledSubnav = styled.nav(({ theme }) => ({
  background: theme.background.app,
  borderBottom: `1px solid ${theme.color.border}`,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: 15,
  position: 'sticky',
  top: 0,
  zIndex: 1,
}));

export interface SubnavProps {
  status: CallState;
  onPrevious: () => void;
  onNext: () => void;
  onReplay: () => void;
  goToStart: () => void;
  goToEnd: () => void;
  storyFileName?: string;
  hasPrevious: boolean;
  hasNext: boolean;
}

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 4,
  padding: 6,
  color: theme.color.dark,
  '&:not(:disabled)': {
    '&:hover,&:focus-visible': {
      color: theme.color.secondary,
    },
  },
}));

export const StyledIconButton = styled(StyledButton)(({ theme }) => ({
  color: theme.color.mediumdark,
  margin: '0 3px',
  '&:not(:disabled)': {
    '&:hover,&:focus-visible': {
      background: transparentize(0.9, theme.color.secondary),
    },
  },
}));

const StyledSeparator = styled(Separator)({
  marginTop: 0,
});

const StyledLocation = styled(P)(({ theme }) => ({
  color: theme.color.dark,
  justifyContent: 'flex-end',
  textAlign: 'right',
  paddingRight: 15,
  fontSize: 13,
}));

const Group = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const RewindButton = styled(StyledIconButton)({
  marginLeft: 9,
});

const JumpToEndButton = styled(StyledButton)({
  marginLeft: 9,
  marginRight: 9,
});

export const Subnav: React.FC<SubnavProps> = ({
  status,
  onPrevious,
  onNext,
  goToStart,
  goToEnd,
  storyFileName,
  hasNext,
  hasPrevious,
}) => {
  const buttonText = status === CallStates.ERROR ? 'Scroll to error' : 'Scroll to end';

  return (
    <StyledSubnav>
      <Group>
        <StatusBadge status={status} />

        <JumpToEndButton onClick={goToEnd} disabled={!hasNext}>
          {buttonText}
        </JumpToEndButton>

        <StyledSeparator />

        <RewindButton containsIcon title="Go to start" onClick={goToStart} disabled={!hasPrevious}>
          <Icons icon="rewind" />
        </RewindButton>
        <StyledIconButton containsIcon title="Go back" onClick={onPrevious} disabled={!hasPrevious}>
          <Icons icon="playback" />
        </StyledIconButton>
        <StyledIconButton containsIcon title="Go forward" onClick={onNext} disabled={!hasNext}>
          <Icons icon="playnext" />
        </StyledIconButton>
        <StyledIconButton containsIcon title="Go to end" onClick={goToEnd} disabled={!hasNext}>
          <Icons icon="fastforward" />
        </StyledIconButton>
      </Group>
      {storyFileName && (
        <Group>
          <StyledLocation>{storyFileName}</StyledLocation>
        </Group>
      )}
    </StyledSubnav>
  );
};

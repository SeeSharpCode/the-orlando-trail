import { Action, Dispatch } from '@reduxjs/toolkit';
import { GameState, ParkArea, changeMagic, dysneyterry, selectRandomMember } from '.';

export default function randomEvent(parkArea: ParkArea) {
  return (dispatch: Dispatch, getState: () => { game: GameState }) => {
    const events = [...Object.values(genericEvents), ...Object.values(areaEvents[parkArea] ?? [])];
    const filteredEvents = events.filter(event => !event.condition || event.condition(getState().game));
    const event = filteredEvents[Math.floor(Math.random() * filteredEvents.length)];
    dispatch(event.action(getState().game));
  };
}

interface Event {
  action: (state: GameState) => Action;
  condition?: (state: GameState) => boolean;
}

const genericEvents: Record<string, Event> = {
  downpour: {
    action: state => {
      const member = selectRandomMember(state.members);
      return changeMagic([member], -1, `${member.name}'s clothes were soaked in a rainstorm`);
    },
  },
  droppedIceCream: {
    action: state => {
      const child = selectRandomMember(state.members, 'Child');
      return changeMagic([child], -1, `${child.name} dropped their ice cream`);
    },
    condition: state => Object.values(state.members).some(m => m.age === 'Child'),
  },
  lostChild: {
    action: state => {
      const child = selectRandomMember(state.members, 'Child');
      return changeMagic([child], -2, `${child.name} got lost`);
    },
    condition: state => Object.values(state.members).some(m => m.age === 'Child'),
  },
  dysneyterry: {
    action: state => dysneyterry(selectRandomMember(state.members)),
  },
  hiddenMickey: {
    action: state => {
      const member = selectRandomMember(state.members);
      return changeMagic([member], 2, `${member.name} found a hidden Mickey!`);
    },
  },
  magicalMemory: {
    action: state => {
      const member = selectRandomMember(state.members);
      return changeMagic([member], 1, `${member.name} made a magical memory`);
    },
  },
};

const areaEvents: Record<ParkArea, Record<string, Event>> = {
  'Main Street USA': {
    takeCastlePictures: {
      action: state =>
        changeMagic([selectRandomMember(state.members, 'Child')], -1, 'The kids get bored taking castle pictures'),
    },
    buyMickeyBalloon: {
      action: state => {
        const child = selectRandomMember(state.members, 'Child');
        return changeMagic([child], 1, `You buy a Mickey balloon for ${child.name}`);
      },
    },
  },
  Fantasyland: {
    test: {
      action: state => {
        const child = selectRandomMember(state.members, 'Child');
        return changeMagic([child], 1, `${child.name} rides the carousel`);
      },
    },
  },
};

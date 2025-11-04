import { createListenerMiddleware, createSelector } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';
import {
  Age,
  LogMessage,
  magicChange,
  Member,
  runLoop,
  selectAllMembers,
  selectSupplyById,
  SupplyId,
  useSupply,
} from './game-slice';

interface MagicChangeEvent {
  type: 'magic-change';
  age: Age;
  createLogText: (name: string) => string;
  magic: number;
}

export interface MagicChangePayload {
  member: Member;
  magic: number;
  logText: string;
}

export interface UseSupplyEvent {
  type: 'use-supply';
  logText: LogMessage;
  noSupplyLogText: (name: string) => string;
  supplyId: SupplyId;
}

export type UseSupplyPayload = Omit<UseSupplyEvent, 'type' | 'noSupplyLogText'>;

type GameEvent = MagicChangeEvent | UseSupplyEvent;

const events: GameEvent[] = [
  {
    type: 'magic-change',
    age: 'Child',
    createLogText: name => `${name} dropped their ice cream`,
    magic: -1,
  },
  {
    type: 'magic-change',
    age: 'Adult',
    createLogText: name => `${name} has dysneyterry`,
    magic: -2,
  },
  {
    type: 'use-supply',
    supplyId: 'Set of Clothes',
    logText: { text: 'You lose one set of clothes to a rainstorm' },
    noSupplyLogText: name => `${name}'s clothes were soaked in a rainstorm and you have no extras`,
  },
];

const selectRandomMember = (members: Member[]) => members[Math.floor(Math.random() * selectRandomMember.length)];

const selectRandomMemberByAge = (members: Member[], age: Age) => {
  const filtered = members.filter(m => m.age === age);
  return filtered[Math.floor(Math.random() * filtered.length)];
};

export const gameLoopMiddleware = createListenerMiddleware();

gameLoopMiddleware.startListening.withTypes<RootState, AppDispatch, any>()({
  predicate: (action, currentState, _) => {
    const nextInterval = currentState.game.gameLoopInterval + 1;
    return action.type === 'game/runLoop' && nextInterval % 5 !== 0;
  },
  effect: async (_, api) => {
    await api.delay(4000);

    const event = events[Math.floor(Math.random() * events.length)];

    switch (event.type) {
      case 'magic-change':
        const { age, magic, createLogText } = event;
        const member = selectRandomMemberByAge(selectAllMembers(api.getState()), age);
        api.dispatch(magicChange({ member, magic, logText: createLogText(member.name) }));
        break;
      case 'use-supply':
        const { supplyId, logText } = event;
        if (selectSupplyById(api.getState(), event.supplyId).quantity > 0) {
          api.dispatch(useSupply({ supplyId, logText }));
        } else {
          const member = selectRandomMember(selectAllMembers(api.getState()));
          api.dispatch(magicChange({ member, magic: -1, logText: event.noSupplyLogText(member.name) }));
        }
        break;
    }
    api.dispatch(runLoop());
  },
});

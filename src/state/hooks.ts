import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useMembers = () => useAppSelector(state => Object.values(state.game.members));
export const useFaintedMembers = () => useAppSelector(state => Object.values(state.game.faintedMembers));
export const useParkArea = () => useAppSelector(state => state.game.parkArea);
export const useVisitedAreas = () => useAppSelector(state => state.game.visitedAreas);

export const useLogs = () => useAppSelector(state => state.game.logs);

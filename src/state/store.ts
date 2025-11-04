import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './game-slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { gameLoopMiddleware } from './game-loop';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(gameLoopMiddleware.middleware),
});


export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useLogs = () => useAppSelector(state => state.game.logs);

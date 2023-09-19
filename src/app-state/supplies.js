import { log, logRed } from './logs';

export function selectRandomSupply(supplies) {
  const supplyKeys = Object.keys(supplies);
  return supplyKeys[Math.floor(Math.random() * supplyKeys.length)];
}

export function handleLoseSupplies(state, supplyKey, amount, logMessage) {
  const { supplies, logs } = state;
  const supply = supplies[supplyKey];
  return {
    ...state,
    supplies: { ...supplies, [supplyKey]: { ...supply, quantity: supply.quantity - amount } },
    logs: [...logs, log(logMessage), logRed(`You lose ${amount} ${supply.name}`)],
  };
}

export function handleBuySupplies(state, supplyKey, amount) {
  const { supplies, logs, occupation } = state;
  const supply = supplies[supplyKey];
  const cost = supply.unitPrice * amount;
  const logMessage = `You spend $${cost} for ${amount} ${supply.name}`;
  return {
    ...state,
    supplies: { ...supplies, [supplyKey]: { ...supply, quantity: supply.quantity + amount } },
    occupation: deductCash(occupation, cost),
    logs: [...logs, log(logMessage)],
  };
}

export function deductCash(occupation, amount) {
  return { ...occupation, cash: occupation.cash - amount };
}

const SIMULATED_DELAY = 1000;
const delay = duration => fn => setTimeout(fn, duration);

export const weit = delay(SIMULATED_DELAY);

import redux = require("redux");

type CounterState = {
  counter: number;
};

const CounterReducer: redux.Reducer<CounterState> = (prev) => {
  return {
    counter: (prev?.counter || 0) + 1,
  };
};

export const main = () => {
  const store = redux.createStore(CounterReducer);
  const consumer = () => {
    console.log(store.getState());
  };

  store.subscribe(consumer);
  store.dispatch({ type: "Increment" });
  store.dispatch({ type: "Increment" });
};

main();

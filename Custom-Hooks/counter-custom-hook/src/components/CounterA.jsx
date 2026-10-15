import useCounter from "../hooks/useCounter";
function CounterA() {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <>
      <hr />
      <h2>Counter A</h2>
      <p>
        Current Value: <strong>{count}</strong>
      </p>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>+</button>
      <hr />
    </>
  );
}
export default CounterA;

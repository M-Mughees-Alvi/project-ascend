import useCounter from "../hooks/useCounter";
function CounterB() {
  const { count, increment, decrement, reset } = useCounter(50);

  return (
    <>
      <hr />
      <h2>Counter B</h2>
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
export default CounterB;

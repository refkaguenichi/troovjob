import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { increment, decrement, incrementByAmount } from "../JS/counter";
import { getUsers } from "../JS/userSlice";
import Users from './Users';

const Home = () => {
  const dispatch = useDispatch();
  // const {count} = useSelector((state)=>state.counter)
  const usersData = useSelector((state) => state.user.users);

    useEffect(() => {
      dispatch(getUsers());
    }, []);

  return (
    <div>
      {/* <button onClick={() => dispatch(increment())}>+</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(2))}>+2</button> */}
      <Users users={usersData} />
    </div>
  );
}

export default Home
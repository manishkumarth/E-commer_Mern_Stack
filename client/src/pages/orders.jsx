
import { useEffect } from 'react';
const Orders = () => {
     useEffect(()=>{
        console.log("order component re-render")
      })
    return (
        <div className='h-40 flex justify-center items-center'>
            <h2>No Ordered Yet</h2>
        </div>
    );
}

export default Orders;

import React, { useState } from 'react';
import Calendar from 'react-calendar';

const CustomCalendar=()=> {
  console.log(new Date())
  const [value, onChange] = useState(new Date());

  return (
   
      <Calendar onChange={onChange} value={value} />
      
    
  );
}

export default CustomCalendar
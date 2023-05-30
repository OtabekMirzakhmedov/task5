import React from 'react';
import {allFakers } from '@faker-js/faker';


const FakeData = ({ country, seed }) => {
    const generateData = () => {
        let key;
        switch (country) {
          case 'poland':
            key = 'pl';
            break;
          case 'spain':
            key = 'es';
            break;
          case 'germany':
            key = 'de';
            break;
          default:
            key = 'es';
        }
        allFakers[key].seed(null);

        let data = [];
        for (let i = 1; i <= 20; i++) {
          let record = {};
          record.index = i;
          record.identifier = allFakers[key].string.uuid();
          record.name = allFakers[key].person.fullName(undefined, undefined, country);
          record.address = allFakers[key].location.streetAddress();
          record.phone = allFakers[key].phone.number();
          data.push(record);
        }

        return data;
      };
    
      const tableData = generateData();
  return (
    <div>{country} {seed}</div>



  )
}

export default FakeData

// // useNovaPoshtaStreet.ts
// import { useState, useEffect } from 'react';

// const fetchNovaPoshtaStreet = async (streetName: string, settlementRef: string) => {
//   const apiKey = 'f07607422838cfac21a0d1b8603086ca';
//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       apiKey,
//       modelName: 'AddressGeneral',
//       calledMethod: 'searchSettlementStreets',
//       methodProperties: {
//         StreetName: streetName,
//         SettlementRef: settlementRef,
//         Limit: 50,
//       },
//     }),
//   };

//   const response = await fetch('https://api.novaposhta.ua/v2.0/json/', requestOptions);

//   if (!response.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   const data = await response.json();
//   return data.data;
// };

// export const useNovaPoshtaStreet = (streetName: string, settlementRef: string) => {
//   const [streets, setStreets] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [valueInput, setValueInput] = useState<string>('');

//   useEffect(() => {
//     const handleStreetFetch = async () => {
//       if (valueInput.length > 3) {
//         try {
//           setLoading(true);
//           const data = await fetchNovaPoshtaStreet(valueInput, settlementRef);
//           setStreets(data);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     const timer = setTimeout(() => {
//       handleStreetFetch();
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [valueInput, settlementRef]);

//   return { streets, setValueInput, loading };
// };

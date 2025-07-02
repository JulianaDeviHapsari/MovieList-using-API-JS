import config from '../config.js';

// export const fetchApi = async (method, path) => {
//   const response = await fetch(`${config.BASE_URL}${path}`, {
//       method: method,
//       headers: {
//         'X-RapidAPI-Key': config.API_KEY,
//         'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
//       },
//     });

//     const result = await response.json();
//     return result;
// };

export const fetchApi = async (method, path) => {
  try {
    const response = await fetch(`${config.BASE_URL}${path}`, {
      method: method,
      headers: {
        'X-RapidAPI-Key': config.API_KEY,
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
      },
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const result = await response.json(); 
    return result; // Return the parsed JSON result
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

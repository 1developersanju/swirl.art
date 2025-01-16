// export async function fetchData<T>(fileName: string): Promise<T> {
//   try {
//     const response = await fetch(`/data/${fileName}`);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`);
//     }

//     // Directly parse the JSON from the response
//     const data = await response.json();

//     return data as T; // Return the parsed data as type T
//   } catch (error) {
//     // Detailed error handling for both fetch and parsing
//     if (error instanceof SyntaxError) {
//       console.error(`Failed to parse JSON for ${fileName}:`, error);
//       throw new Error(`Invalid JSON format in ${fileName}`);
//     } else {
//       console.error(`Error fetching ${fileName}:`, error);
//       throw new Error(`Failed to fetch data from ${fileName}`);
//     }
//   }
// }


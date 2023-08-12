import getConfig from 'next/config';
import Papa from 'papaparse';

const { publicRuntimeConfig } = getConfig();

export async function fetchAndParseProductFeedCsv() {
  try {
    console.log('Fetching product feed...');
    const response = await fetch(publicRuntimeConfig.csvFileUrl);
    console.log('Response:', response);
    const reader = response.body.getReader();
    const result = await reader.read();
    console.log('Result:', result);
    const decoder = new TextDecoder('utf-8');
    const csvData = decoder.decode(result.value);
    console.log('CSV Data:', csvData);
    
    // Parse the CSV data using PapaParse
    const { data } = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    });

    console.log('Parsed Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching and parsing product feed:', error);
    throw error;
  }
}

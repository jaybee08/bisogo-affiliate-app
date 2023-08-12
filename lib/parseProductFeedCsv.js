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

    console.log('Parsed DataFeed:', data);
    
    // Map and normalize the data using the mapping function
    const mappedData = mapProductData(data);

    console.log('Mapped Data:', mappedData);
    return mappedData;
  } catch (error) {
    console.error('Error fetching and parsing product feed:', error);
    throw error;
  }
}

function mapProductData(rawData) {
  return rawData.map((product) => ({
    Id: parseInt(product.Id),
    Title: product.Title || '',
    Link: product.Link || '',
    Description: product.Description || '',
    Image_link: product.Image_link || '',
    Price: parseFloat(product.Price) || 0,
    Sale_price: parseFloat(product.Sale_price) || 0,
    Brand: product.Brand || '',
    Availability: product.Availability || '',
  }));
}

export const handler = async (event: any, _context: any) => {
  const { pathParameters = {} } = event;
  
  return `Hello from ${pathParameters.productId} product handler`;
};

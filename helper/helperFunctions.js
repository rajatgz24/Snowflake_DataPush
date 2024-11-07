const getRandomAction = () => {
  const actions = ['Order Placement', 'Payment Status', 'Order Shipment', 'Order Delivery', 'Order Cancellation'];
  const randomIndex = Math.floor(Math.random() * actions.length);
  return actions[randomIndex];
};

const getRandomStatus = () => {
  const statuses = ['Completed', 'Pending', 'Failed', 'Processing'];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};

export { getRandomAction, getRandomStatus };

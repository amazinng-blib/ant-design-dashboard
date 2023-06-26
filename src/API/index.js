export const getOrders = async () => {
  try {
    const res = await fetch('https://dummyjson.com/carts/1');
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRevenue = async () => {
  try {
    const res = await fetch('https://dummyjson.com/carts');
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getInventory = async () => {
  try {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCustomers = async () => {
  try {
    const res = await fetch('https://dummyjson.com/users');
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async () => {
  try {
    const res = await fetch('https://dummyjson.com/comments');
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

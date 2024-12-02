import axios from 'axios';
export async function getAllProducts(limit) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/product/general?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}
export async function getProductDetails(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/product/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}

export async function getAllColors(limit) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/product/color`);
        return response.data;
    } catch (error) {
        console.error('Error fetching colors:', error);
        throw error;
    }
}

export async function getAllSizes(limit) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/product/size`);
        return response.data;
    } catch (error) {
        console.error('Error fetching sizes:', error);
        throw error;
    }
}

export async function getFilteredProducts(color, size) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/product/general?color=${color}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

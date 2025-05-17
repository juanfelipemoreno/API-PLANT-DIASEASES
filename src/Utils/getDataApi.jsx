export const getDataApi = async({url,endpoint,params = {}}) => {

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        
        return data;
    } catch (error) {
        throw error;
    } 
}
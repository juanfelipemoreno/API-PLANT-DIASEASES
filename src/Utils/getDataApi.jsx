export const getDataApi = async({url,endpoint,params = {}}) => {

    try {
         
        const queryString = new URLSearchParams(params).toString();
        let fullUrl = '';

        if (!params.api_key) {
            throw new Error('El api_key es obligatorio y no puede estar vacío.');
        }
        if(endpoint != undefined){
            fullUrl = `${url}${endpoint}?${queryString}`;
        }else{
            throw new Error(`Error: El endpoint es obligatorio`);
        }
        
        const response = await fetch(fullUrl);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        
        return data;
    } catch (error) {
        throw error;
    } 
}
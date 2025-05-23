import axios from "axios"

export const getDataApi = async({url,endpoint = '',params = {},token = null,method = 'post'}) => {

    try {
        
        let fullUrl = '';

        if(endpoint != undefined){
            fullUrl = `${url}${endpoint}`;
        }else{
            throw new Error(`Error: El endpoint es obligatorio`);
        }

        const response = await axios({
                            url: fullUrl,
                            method: method,
                            headers: {
                                'Content-Type': 'application/json',
                                ...(token && { 'Api-Key': token })
                            },
                            data:{
                                ...(params && params)
                            }
                        });
        console.log(response.data.status)
        if (response.data.status !== 'COMPLETED' &&  response.data.status !== undefined) {
            throw new Error(`Error 1: ${response.data.status} - ${response.statusText}`);
        }
        if(response.status !== 200 && response.status !== undefined){
            throw new Error(`Error 2: ${response.status} - ${response.statusText}`);
        }
        
        return response.data;
    } catch (error) {
        throw error;
    } 
}
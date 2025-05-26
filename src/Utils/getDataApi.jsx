import axios from "axios"

export const getDataApi = async({url,endpoint = '',params = {},token = null,method = 'post',get = ''}) => {

    try {
        
        let fullUrl = '';

        if(endpoint != undefined){
            fullUrl = `${url}${endpoint}`;
        }else{
            throw new Error(`Error: El endpoint es obligatorio`);
        }
        
        if(get != ''){
            fullUrl = `${fullUrl}?${get}`;
        }
        console.log(fullUrl)
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
        console.log(response)
        if (response.data.status !== 'COMPLETED' &&  response.data.status !== undefined) {
            throw new Error(`Error 1: ${response.data.status} - ${response.statusText}`);
        }
        if((response.status !== 200 && response.status !== 201) && response.status !== undefined){
            throw new Error(`Error 2: ${response.status} - ${response.statusText}`);
        }
        
        return response.data;
    } catch (error) {
        throw error;
    } 
}
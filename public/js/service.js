import request from './request';

export let findAll = () => {
    return request({url:"data/data.json"})
        .then(data => data = JSON.parse(data)) 
} 


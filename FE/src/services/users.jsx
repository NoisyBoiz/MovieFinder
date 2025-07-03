import Config from './config.jsx';

const usersService = {
    async login(data) {
        const res = await Config.postMethod('/users/login', data);
        return res
    }, 
    
    async signup(data){
        const res = await Config.postMethod('/users/signup', data);
        return res
    }
}

export default usersService;
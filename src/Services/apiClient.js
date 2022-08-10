import axios from "axios"

class ApiClient{
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "surakimaga_driver_token"
    }

    setToken(token) {
    this.token = token
    }

    async request({ endpoint, method = `GET`, data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json",
            // Authorization: this.token ? `Bearer ${this.token}` : "",
        }
        if(this.token){
            headers["Authorization"]=`Bearer ${this.token}`
        }
        // console.log("hello",headers,data,url,method)
        try {
            const res = await axios({url, method, data, headers })
            // console.log(res)
            return { data: res.data, error: null }
        } catch (error) {
            console.error("APIclient.makeRequest.error:")
            console.error({ errorResponse: error.response })
            const message = error?.response?.data?.error?.message
            return { data: null, error: message || String(error) }
        }
    }

    async verifyUser(credentials) {
        return await this.request({ endpoint: `driverauth/verify`, method: `POST`, data: credentials })
    }
    async sendOtp(credentials){
        return await this.request({ endpoint: `driverauth/sendOtp`, method: `POST`, data: credentials })
    }
    async resendOtp(){
        return await this.request({ endpoint: `driverauth/resendOtp`, method: `GET` })
    }
    async submitCredentials(credentials){
        return await this.request({ endpoint: `driverauth/submitCredentials`, method: `POST`, data:credentials})
    }
    async login(credentials){
        console.log(credentials)
        return await this.request({ endpoint: `driverauth/login`, method: `POST`, data:credentials})
    }
}


const API = new ApiClient(process.env.REACT_APP_REMOTE_HOST_URL || "http://192.168.1.11:3001")

export default API
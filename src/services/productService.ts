// services/api.ts
import axios, { type AxiosInstance } from 'axios'

class ApiService {
  private axios: AxiosInstance

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL
    })
  }

  public async get<T>(url: string): Promise<T> {
    const response = await this.axios.get<T>(url)
    return response.data
  }

  public async post<T>(url: string, data: any): Promise<T> {
    const response = await this.axios.post<T>(url, data)
    return response.data
  }

  public async put<T>(url: string, data: any): Promise<T> {
    const response = await this.axios.put<T>(url, data)
    return response.data
  }

  public async delete<T>(url: string): Promise<T> {
    const response = await this.axios.delete<T>(url)
    return response.data
  }
}

export const apiService = new ApiService('https://fakestoreapi.com')

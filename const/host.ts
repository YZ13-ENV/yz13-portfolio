export const api_host: string = 
process.env.NEXT_PUBLIC_API_HOST_PROD as string
// process.env.NODE_ENV === 'development' 
// ? process.env.NEXT_PUBLIC_API_HOST_DEV as string
// : process.env.NEXT_PUBLIC_API_HOST_PROD as string
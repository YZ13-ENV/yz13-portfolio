export const api_host: string = 
// 'https://www.api.v2.darkmaterial.space'
process.env.NODE_ENV === 'development' 
? process.env.NEXT_PUBLIC_API_HOST_DEV as string
: process.env.NEXT_PUBLIC_API_HOST_PROD as string
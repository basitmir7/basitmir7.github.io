/**
 * Helper Functions
 */

export const targetUrl =(url)=>{
    if (url){
        return url.startsWith('http') ? '_blank' : '_self'
    }
}
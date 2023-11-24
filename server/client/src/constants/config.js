//API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading:{
        title: 'Loading...',
        message: 'Please wait while we load the data'
    },
    success:{
        title: 'Success',
        message: 'Data loaded successfully'
    },
    responseFailure:{
        title: 'Error',
        message: 'An error occured while processing the response from the server. Please try again later'
    },
    requestFailure:{
        title: 'Error',
        message: 'An error occured while parsing request data'
    },
    networkError:{
        title: 'Error',
        message: 'Unable to connect to the server. Please check your network connection and try again later'
    }
    
}

//API SERVICE CALL
//NEED SERVICE CALL:{url: '/', method: 'POST/GET/PUT/DELETE' params: true/false, query: true/false}
export const SERVICE_URLS = {
    userSignup : { url: '/signup' , method: 'POST'},
    userLogin : { url: '/login' , method: 'POST'},
    uploadFile : { url: '/file/upload' , method: 'POST'},
    createPost : { url: 'create' , method: 'POST'},
    getAllPosts : { url: '/posts' , method: 'GET', params: true},
    getPostById : { url: '/post' , method: 'GET', query: true},
    updatePost : { url: '/update' , method: 'PUT', query: true},
    deletePost : { url: '/delete' , method: 'DELETE', query: true},
    newComment : { url: '/comment/new' , method: 'POST'},
    getAllComments : { url: '/comments' , method: 'GET', query: true},
    deleteComment : { url: '/comment/delete' , method: 'DELETE', query: true}
}
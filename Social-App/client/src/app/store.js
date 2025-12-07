import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../app/features/user/userSlice.js'
import connectionsReducer from '../app/features/connections/connectionsSlice.js'
import messagesReducer from '../app/features/messages/messagesSlice.js'

export const store = configureStore({
    reducer : {
        user : userReducer,
        connections : connectionsReducer,
        messages : messagesReducer
    }
})
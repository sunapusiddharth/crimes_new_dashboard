import {
    load_inbox,
    load_mail,
    save_inbox
} from './../actions/mailActions';

const initState = {
    mail_loading:false,
    inbox:[],
    sent:[],
    drafts:[],
    trash:[],
    mail_sent:false
}

const mailReducer = (state = initState, action) => {
    switch (action.type) {
        case load_mail:
            return {
                ...state, mail_loading: true
            }
        case load_inbox:
            return {
                ...state,
                mail_loading: false,
                inbox: action.data
            }
            case save_inbox:
            return {
                ...state,
                mail_loading: false,
                mail_sent: action.data
            }
        default:
            return { ...state }
    }
}

export default mailReducer;


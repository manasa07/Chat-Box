import {IntlProvider, FormattedDate, FormattedTime} from 'react-intl';
import Header from './header.js';

const date = new Date();
const time = new Date().getTime();

class ChatApp extends React.Component {

    constructor() {
        super();
        this.addMessage = this.addMessage.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.state = {
            tasks: [],
            notifications: [],
            remainders: [],
            messageInput: '',
            messageType: '',
            showTime: true,
            refreshTime: false
        };
    }

    addMessage() {

        if(this.state.messageType == 'task'){
            const currentMessage = this.state.tasks;
            const newMessage = currentMessage.concat(this.state.messageInput);
            this.setState({ tasks: newMessage });
            this.setState({messageInput: ''});
        }
        else if(this.state.messageType == 'notification'){
            const currentMessage = this.state.notifications;
            const newMessage = currentMessage.concat(this.state.messageInput);
            this.setState({ notifications: newMessage });
            this.setState({messageInput: ''});
        }
        else if(this.state.messageType == 'remainders'){
            const currentMessage = this.state.remainders;
            const newMessage = currentMessage.concat(this.state.messageInput);
            this.setState({ remainders: newMessage });
            this.setState({messageInput: ''});
        }
        else {
            alert('Please select given option before submitting!!!!');
        }

    }

    handleMessageChange(e) {
        this.setState({ messageInput: e.target.value });
    }

    closeTime(e) {
        this.setState({ showTime: false });
        this.setState({ refreshTime: true });
    }

    refreshTime(e){
        this.setState({ refreshTime: false });
        this.setState({ showTime: true });
    }

    deleteMessage(item, event){

        if(this.state.messageType == 'task') {
            const messageData = this.state.tasks;
            if (messageData.indexOf(item) > -1) {
                messageData.splice(messageData.indexOf(item), 1);
                this.setState({tasks: messageData})
            }
        }
        else if(this.state.messageType == 'remainders') {
            const messageData = this.state.remainders;
            if (messageData.indexOf(item) > -1) {
                messageData.splice(messageData.indexOf(item), 1);
                this.setState({remainders: messageData})
            }
        }
        else if(this.state.messageType == 'notification') {
            const messageData = this.state.notifications;
            if (messageData.indexOf(item) > -1) {
                messageData.splice(messageData.indexOf(item), 1);
                this.setState({notifications: messageData})
            }
        }
    }

    selectOptions(event) {
        this.setState({ messageType: event.target.value });
    }

    render() {
        return (
            <div className="container">
                    <Header />
                    <div className="right-panel">
                        <h4>{this.props.addNotification}</h4>
                        <hr/>
                        <div className="radio" onChange={this.selectOptions.bind(this)}>
                            <label className="radio-inline">
                                <input type="radio" value="task" name="option1"/>
                                <span>{this.props.tasks}</span>
                            </label><br/>
                            <hr/>
                            <label className="radio-inline">
                                <input type="radio" value="notification" name="option2"/>
                                <span>{this.props.notifications}</span>
                            </label><br/>
                            <hr/>
                            <label className="radio-inline">
                                <input type="radio" value="remainders" name="option3"/>
                                <span>{this.props.remainders}</span>
                            </label><br/>
                            <hr/>
                        </div>
                        <div>
                            <h4>{this.props.messages}</h4>
                            <textarea
                              className="form-control message-inbox"
                              rows="3"
                              ref="form"
                              value = {this.state.messageInput}
                              type="text"
                              placeholder="Type Your Message"
                              onChange={this.handleMessageChange}
                            />
                        </div><br/>
                        <div>
                            <button
                              className="btn btn-primary cursor-symbol" onClick={this.addMessage.bind(this, this.state.messageInput)}>{this.props.submit}</button>
                        </div>
                    </div>

                    <div className="left-panel">
                        <div className="date-element">
                            <p className="date-panel">
                                <FormattedDate
                                    value={date}
                                    month="long"
                                    day="numeric"
                                    year="numeric"
                                />
                            </p>
                        </div>
                        <hr/>
                        <div className="notification_list" id="scrollbar">
                            <h2>{this.props.tasks}<span className="lists">({this.state.tasks.length})</span></h2>
                            <ol className="display-message">
                                {this.state.tasks.map((item,index) =>
                                    <li key={index}>
                                        {item}
                                        <span className="delete-button glyphicon glyphicon-trash cursor-symbol" onClick={this.deleteMessage.bind(this, item)}></span>
                                    </li>
                                )}
                            </ol>
                        </div>
                        <hr/>
                        <div className="notification_list" id="scrollbar">
                            <h2>{this.props.notifications}<span className="lists">({this.state.notifications.length})</span></h2>
                            <ol className="display-message inline">
                                {this.state.notifications.map((item,index) =>
                                    <li key={index}>
                                        {item}
                                        <span className="delete-button glyphicon glyphicon-trash cursor-symbol" onClick={this.deleteMessage.bind(this, item)}></span>
                                    </li>
                                )}
                            </ol>
                        </div>
                        <hr/>
                        <div className="notification_list" id="scrollbar">
                            <h2>{this.props.remainders}<span className="lists">({this.state.remainders.length})</span></h2>
                            <ol className="display-message">
                                {this.state.remainders.map((item,index) =>
                                    <li key={index}>
                                        {item}
                                        <span className="delete-button glyphicon glyphicon-trash cursor-symbol" onClick={this.deleteMessage.bind(this, item)}></span>
                                    </li>
                                )}
                            </ol>
                        </div>
                        <br/>
                        <div className="time-element inline">
                            <p className="time-panel" style={{display: this.state.showTime ? 'block' : 'none' }}>
                                <span className="present_day">{this.props.today}</span>
                                <FormattedTime
                                    value={time}
                                />
                                <span className="remove-icon glyphicon glyphicon-remove cursor-symbol" onClick={this.closeTime.bind(this)}></span>
                            </p>
                            <p className="refresh-panel" style={{display: this.state.refreshTime ? 'block' : 'none' }}>
                                <button type="button" className="btn btn-primary refresh-button cursor-symbol" onClick={this.refreshTime.bind(this)}>
                                    <span className="glyphicon glyphicon-refresh"></span>{this.props.undo}
                                </button>
                            </p>
                        </div>
                    </div>
            </div>
        );
    }
}

ChatApp.defaultProps = {
   addNotification: 'Add Notifications',
   tasks: 'Tasks',
   notifications: 'Notifications',
   remainders: 'Remainders',
   messages: 'Messages',
   undo: 'Undo',
   submit: 'Submit',
   today: 'Today At'
}


ReactDOM.render(<IntlProvider>
        <ChatApp />
    </IntlProvider>,
    document.getElementById('app'));

import { Component } from "react";
import { connect } from 'react-redux';
class Add extends Component {
    login() {
        this.props.onLogin();
    }

    logout() {
        this.props.onLogout()
    }

    toggleCounter() {

    }
    render() {
        return (
            <div>
                <button onClick={this.increment.bind(this)}></button>
                <button onClick={this.decrement.bind(this)}></button>
                <button onClick={this.toggleCounter.bind(this)}></button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.isLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: () => dispatch({ type: 'LOGIN' }),
        onLogout: () => dispatch({type: 'LOGOUT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
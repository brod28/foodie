import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import HeaderForPopup from '../../Header/HeaderForPopup'

class Menus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: this.props.menus
        }
    }
    componentDidMount() {
    }

    render() {
        return (
            (
                <div id="menus_ancor" className="menus">
                    {this.state.menus.map(menu =>
                        <div>
                            <a href={menu.menu.url} target="_blank">
                                click here to see the menu on {menu.source}
                            </a>
                        </div>

                    )}
                </div>

            )
        )
    }
}
export default Menus;

import Navigation from "../../container/Navigation/index.js";
import Typography from "../../UI/typography/index.js";

class Aboutpage {
    constructor() {
        this.state = {
            isLightMode:false,
        };
        this.aboutContainer = document.createElement('div');
        this.init();
    }
    init() {
        this.render();
    }
    render () {
        this.aboutContainer.innerHTML = '';
        const navigation = 
        new Navigation ({
            setLightMode: (value) => this.setState({isLightMode: value}), 
            isLightMode: this.state.isLightMode,
        });
        this.aboutContainer.appendChild(navigation.render());
        const title = new Typography ({ variant : 'h1', children: 'About Page'});
        this.aboutContainer.appendChild(title.render());

        return this.aboutContainer;
    }
}

export default Aboutpage;   
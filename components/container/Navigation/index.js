import Typography from "../../UI/typography/index.js";
import Switch from "../../UI/Switch/index.js";

class Navigation {
    constructor({setLightMode, isLightMode}) {
        this.navigationContainer = document.createElement('div');
        this.navigationContainer.className = 'navigation-container';
        this.setLightMode = setLightMode;
        this.isLightMode = isLightMode;
    }

    render() {
        const contanerLeft = document.createElement('div');
        contanerLeft.className = 'container-left';
        const title = new Typography ({ variant : 'h1', children: 'FASTMOVIE'});
        contanerLeft.appendChild(title.render());
        const homeLink = new Typography ({ variant : 'h5', children: 'Home', 
            onclick: () => {window.location.hash = '';
        }, 
    });
        
        // homeLink.onclick = () => {
        //     window.location.hash = ' ';
        // }
        contanerLeft.appendChild(homeLink.render());
        const aboutLink = new Typography ({ 
            variant: 'h5',
            children: 'About',
            onclick: () => {window.location.hash = 'about';
        }, 
    });
        contanerLeft.appendChild(aboutLink.render());
        this.navigationContainer.appendChild(contanerLeft);
        this.navigationContainer.appendChild(
            new Switch({
                setLightMode: this.setLightMode, 
                isChecked: this.isLightMode,
        }).render());
        return this.navigationContainer;
    }
}

export default Navigation;
import Typography from "../../UI/typography/index.js";

class NotFound {
    constructor() {
        this.notFoundContainer = document.createElement('div');
        this.notFoundContainer.className = 'not-found';
        this.init();
    }
    
    init() {
        this.render();
    }
    render() {
        this.notFoundContainer.innerHTML = ` `;
        const title = new Typography({ 
            variant: 'h1', 
            children: 'This Page Not Developed Yet  :(',
        });
        this.notFoundContainer.appendChild(title.render());
        return this.notFoundContainer;
    }
}
export default NotFound;
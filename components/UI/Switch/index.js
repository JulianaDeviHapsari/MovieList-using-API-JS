class Switch { 
    constructor ({setLightMode, isChecked}) {
        this.switchButton = document.createElement('input');
        this.switchButton.type = 'checkbox';
        this.switchButton.id = 'switch-toggle';
        this.switchButton.className = 'switch-toggle';
        this.switchButton.checked = isChecked;

        this.switchLabel = document.createElement('label');
        this.switchLabel.htmlFor = 'switch-toggle';
        this.switchLabel.className = 'switch-label';

        this.switchContainer = document.createElement('div');
        this.switchContainer.className = 'switch-container';
        this.switchContainer.appendChild(this.switchButton);
        this.switchContainer.appendChild(this.switchLabel);

        this.attachEventListeners();
        this.setLightMode = setLightMode;
    }

    attachEventListeners() {
        this.switchButton.addEventListener('change', () => {
            this.onChange(this.switchButton.checked);
        });
    }

    onChange(isChecked) {
        this.setLightMode(isChecked);
        }
    
    render() {
        return this.switchContainer;
    }
}

export default Switch;
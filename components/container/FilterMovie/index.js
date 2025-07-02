import Button from '../../UI/Button/index.js';
import Select from '../../UI/Select/index.js';

class FilterMovie {
  constructor(props) {
    const {submitFilter, isLoading, setType, setYear, type, year} = props;
    this.filterContainer = document.createElement('div');
    this.submitFilter = submitFilter; 
    this.isLoading = isLoading; // State to track loading status
    this.setType = setType; // Function to set type
    this.setYear = setYear;
    this.type = type; // Initial type value
    this.year = year; // Initial year value  
  }

  render() {
    this.filterContainer.class = 'filter-container'; // Clear previous content
    const homeButtonSearch = new Button({
        text: 'Search',
        variant: 'primary',
        onclick: () => this.submitFilter(),
        disabled: this.isLoading, // Disable button if count is 5 or more
    });
    this.filterContainer.appendChild(
        new Select({
        options: [
            { value : '', text: 'Select Type'},
            { value : 'movie', text: 'Movie'},
            { value : 'short', text: 'Short'},
        ],
        selectedValue: this.type, 
        onChange: (value) => {
            this.setType(value);
        },
        width: '140px', // Set width to 100px
    }).render()
);
    this.filterContainer.appendChild(
        new Select({
        options: [
            { value : '', text: 'Select Year'},
            { value : '2029', text: '2029'},
            { value : '2028', text: '2028'},
            { value : '2027', text: '2027'},
            { value : '2026', text: '2026'},
            { value : '2025', text: '2025'},
            { value : '2024', text: '2024'},
            { value : '2023', text: '2023'},
            { value : '2022', text: '2022'},
            { value : '2021', text: '2021'},
            { value : '2020', text: '2020'},
        ],
        selectedValue: this.year,
        onChange: (value) => {
            this.setYear(value);
        },
        width: '200px', 
    }).render()
);
    this.filterContainer.appendChild(homeButtonSearch.render());
    return this.filterContainer;
}
}

export default FilterMovie;
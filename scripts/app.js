const studentName = "Harsh";
const studentNumber = "1163059";
console.log(`${studentName}- ${studentNumber}`);

let headerContent = document.querySelector(`h1`);
headerContent.classList.add(`heading1`); 
headerContent.innerHTML = `${studentName}- ${studentNumber}`;


const app = Vue.createApp({
    data(){
        return{
            Facts:[],
            location: 'London, Ontario',
            weather: {
                temperature: '',
                wind: '',
                description: ''
            },
            word: '',
            define: {
                definition: '',
                phonetic: '',
                partOfSpeech: ''
            }
        };
    },


    methods: {
        generateNew(){
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.Facts = data.text;
            })
            .catch(error => {
                console.error('Error: ',error);
            });
        },

        getWeather() {
            fetch(`https://goweather.herokuapp.com/weather/${this.location}`)
                .then(response => response.json())
                .then(data => {
                    this.weather.temperature = data.temperature;
                    this.weather.wind = data.wind;
                    this.weather.description = data.description;
                });
        },

        fetchDefinition() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
                .then(response => response.json())
                .then(data => {
                    let entry = data[0];
                    this.define.definition = entry.meanings[0].definitions[0].definition;
                    this.define.phonetic = entry.phonetics[0].text;
                    this.define.partOfSpeech = entry.meanings[0].partOfSpeech;
                });
        }
    },

    created() {
        this.generateNew(); 
        this.getWeather();
    },
        
});

app.mount('#app');
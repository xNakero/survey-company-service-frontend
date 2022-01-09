<template>
  <div v-if="role === 'RESEARCHER' && loggedIn === true" class="main-ui-style">
    <h1>Dodaj ankietę</h1>
    <form @submit.prevent>
      <div>
        <h2>Dane ankiety</h2>
        <div>
          <h3>Tytuł</h3>
          <input type="text" v-model="title" placeholder="" class="input-box-form-text">
        </div>
        <div>
          <h3>Opis</h3>
          <textarea v-model="description" placeholder="" rows="5" class="input-box-form-textarea"/>
        </div>
        <div>
          <h3>Link do badania</h3>
          <input type="text" v-model="url" placeholder="" class="input-box-form-text">
        </div>
        <div>
          <h3>Ilość minut na wykonanie badania</h3>
          <input type="number" v-model="timeToCompleteInMinutes" class="input-box-form-number">
        </div>
        <div>
          <h3>Ilość miejsc</h3>
          <input type="number" v-model="spots" class="input-box-form-number">
        </div>
      </div>
      <div class="category-line"/>
      <div>
        <h2>Parametry uczestników</h2>
        <div>
          <h3>Minimalny wiek</h3>
          <input type="number" v-model="olderOrEqualThan" class="input-box-form-number">
        </div>
        <div>
          <h3>Maksymalny wiek</h3>
          <input type="number" v-model="youngerOrEqualThan" class="input-box-form-number">
        </div>
        <div>
          <h3>Stan cywilny</h3>
          <select v-model="civilStatus" class="input-box-form-select">
            <option></option>
            <option>Single</option>
            <option>Żonaty</option>
            <option>Rozwiedziony</option>
            <option>Wdowa</option>
          </select>
        </div>
        <div>
          <h3>Płeć</h3>
          <select v-model="sex" class="input-box-form-select">
            <option></option>
            <option>Mężczyzna</option>
            <option>Kobieta</option>
            <option>Inna</option>
          </select>
        </div>
        <div>
          <h3>Kraj urodzenia</h3>
          <select v-model="countryOfBirth" class="input-box-form-select">
            <option></option>
            <option>Polska</option>
            <option>Niemcy</option>
            <option>Anglia</option>
          </select>
        </div>
        <div>
          <h3>Narodowość</h3>
          <select v-model="nationality" class="input-box-form-select">
            <option></option>
            <option>Polska</option>
            <option>Niemcy</option>
            <option>Anglia</option>
          </select>
        </div>
        <div>
          <h3>Obecny kraj pobytu</h3>
          <select v-model="currentCountry" class="input-box-form-select">
            <option></option>
            <option>Polska</option>
            <option>Niemcy</option>
            <option>Anglia</option>
          </select>
        </div>
        <div>
          <h3>Język ojczysty</h3>
          <select v-model="firstLanguage" class="input-box-form-select">
            <option></option>
            <option>Polski</option>
            <option>Niemiecki</option>
            <option>Angielski</option>
          </select>
        </div>
        <div>
          <h3>Najwyższy skończony poziom edukacji</h3>
          <select v-model="educationLevel" class="input-box-form-select">
            <option></option>
            <option>Wykształcenie podstawowe</option>
            <option>Wykształcenie średnie</option>
            <option>Student uczelni wyższej</option>
            <option>Inżynier/Licencjat/Magister</option>
            <option>Doktorat lub wyżej</option>
          </select>
        </div>
        <div>
          <h3>Status ucznia</h3>
          <select v-model="isStudent" class="input-box-form-select">
            <option></option>
            <option>Tak</option>
            <option>Nie</option>
          </select>
        </div>
        <div>
          <h3>Maksymalny miesięczny dochód w złotówkach netto</h3>
          <input type="number" v-model="monthlyIncomeHigherOrEqualThan" class="input-box-form-number">
        </div>
        <div>
          <h3>Minimalny miesięczny dochód w złotówkach netto</h3>
          <input type="number" v-model="monthlyIncomeLesserOrEqualThan" class="input-box-form-number">
        </div>
        <div>
          <h3>Status zatrudnienia</h3>
          <select v-model="employmentStatus" class="input-box-form-select">
            <option></option>
            <option>Pełen etat</option>
            <option>Część etatu</option>
            <option>Bezrobotny</option>
            <option>Emeryt</option>
          </select>
        </div>
        <div>
          <h3>Forma zatrudnienia</h3>
          <select v-model="formOfEmployment" class="input-box-form-select">
            <option></option>
            <option>Umowa o pracę</option>
            <option>Umowa zlecenie</option>
            <option>Własna działalność gospodarcza</option>
          </select>
        </div>
        <div>
          <h3>Branża</h3>
          <select v-model="industry" class="input-box-form-select">
            <option></option>
            <option>IT</option>
            <option>Finanse</option>
            <option>Handlel</option>
          </select>
        </div>
        <div>
          <h3>Poglądy polityczne</h3>
          <select v-model="politicalSide" class="input-box-form-select">
            <option></option>
            <option>Lewica</option>
            <option>Centralne</option>
            <option>Prawica</option>
          </select>
        </div>
      </div>
      <div class="category-line"/>
      <div>
        <button @click="getEligibleParticipantsCount()" class="form-button">
          Sprawdź ilość zakwalifikowanych uczestników
        </button>
        <h3>Ilość zakwalifikowanych uczestników: {{ eligibleParticipants }}</h3>
      </div>
      <div class="category-line"/>
      <div class="margin-under-publish">
        <button @click="publishSurvey()" class="form-button">Opublikuj</button>
      </div>
    </form>
  </div>
  <div v-else>
    <Unauthorized/>
  </div>
</template>

<script>
import axios from "axios";
import Unauthorized from "@/components/Unauthorized";

const api = axios.create({
  baseURL: 'http://localhost:8081'
})

const headers = {
  headers: {Authorization: `Bearer ${localStorage.getItem('auth-token')}`}
}

const countriesFromForm = new Map([
  ['', null],
  ['Polska', 'POLAND'],
  ['Anglia', 'ENGLAND'],
  ['Niemcy', 'GERMANY']
]);

const civilStatusesFromForm = new Map([
  ['', null],
  ['Single', 'SINGLE'],
  ['Żonaty', 'MARRIED'],
  ['Rozwiedziony', 'DIVORCED'],
  ['Wdowa', 'WIDOW']
]);

const gendersFromForm = new Map([
  ['', null],
  ['Mężczyzna', 'MALE'],
  ['Kobieta', 'FEMALE'],
  ['Inna', 'OTHER']
]);

const languagesFromForm = new Map([
  ['', null],
  ['Polski', 'POLISH'],
  ['Angielski', 'ENGLISH'],
  ['Niemiecki', 'GERMAN']
]);

const educationLevelsFromForm = new Map([
  ['', null],
  ['Wykształcenie podstawowe', 'PRIMARY_SCHOOL'],
  ['Wykształcenie średnie', 'HIGH_SCHOOL'],
  ['Student uczelni wyższej', 'UNDERGRADUATE'],
  ['Inżynier/Licencjat/Magister', 'GRADUATE'],
  ['Doktorat lub wyżej', 'DOCTORATE_OR_HIGHER']
]);

const studentStatusesFromForm = new Map([
  ['', null],
  ['Tak', true],
  ['Nie', false]
]);

const employmentStatusesFromForm = new Map([
  ['', null],
  ['Pełen etat', 'FULL_TIME'],
  ['Część etatu', 'PART_TIME'],
  ['Bezrobotny', 'UNEMPLOYED'],
  ['Emeryt', 'RETIRED']
]);

const formsOfEmploymentFromForm = new Map([
  ['', null],
  ['Umowa o pracę', 'CONTRACT_OF_EMPLOYMENT'],
  ['Umowa zlecenie', 'CONTRACT_OF_MANDATE'],
  ['Własna działalność gospodarcza', 'BUSINESS_TO_BUSINESS']
]);

const industriesFromForm = new Map([
  ['', null],
  ['IT', 'IT'],
  ['Finanse', 'FINANCE'],
  ['Handel', 'TRADE']
])

const politicalSidesFromForm = new Map([
  ['', null],
  ['Lewica', 'LEFT'],
  ['Centralne', 'CENTRE'],
  ['Prawica', 'RIGHT']
])

export default {
  name: "SurveyPublishing",
  components: {Unauthorized},
  props: {
    role: String,
    loggedIn: Boolean,
    eligibleParticipants: Number,
    title: String,
    url: String,
    timeToCompleteInMinutes: Number,
    description: String,
    spots: Number,
    olderOrEqualThan: Number,
    youngerOrEqualThan: Number,
    civilStatus: String,
    sex: String,
    countryOfBirth: String,
    nationality: String,
    currentCountry: String,
    firstLanguage: String,
    educationLevel: String,
    isStudent: String,
    monthlyIncomeHigherOrEqualThan: Number,
    monthlyIncomeLesserOrEqualThan: Number,
    employmentStatus: String,
    formOfEmployment: String,
    industry: String,
    politicalSide: String
  },
  methods: {
    getSeconds() {
      return this.timeToCompleteInMinutes * 60
    },
    getQueryParams() {
      return {
        olderOrEqualThan: this.olderOrEqualThan,
        youngerOrEqualThan: this.youngerOrEqualThan,
        civilStatus: civilStatusesFromForm.get(this.civilStatus),
        sex: gendersFromForm.get(this.sex),
        countryOfBirth: countriesFromForm.get(this.countryOfBirth),
        nationality: countriesFromForm.get(this.nationality),
        currentCountry: countriesFromForm.get(this.currentCountry),
        firstLanguage: languagesFromForm.get(this.firstLanguage),
        highestEducationLevelAchieved: educationLevelsFromForm.get(this.educationLevel),
        isStudent: studentStatusesFromForm.get(this.isStudent),
        monthlyIncomeHigherOrEqualThan: Math.trunc(this.monthlyIncomeHigherOrEqualThan),
        monthlyIncomeLesserOrEqualThan: Math.trunc(this.monthlyIncomeLesserOrEqualThan),
        employmentStatus: employmentStatusesFromForm.get(this.employmentStatus),
        formsOfEmployment: formsOfEmploymentFromForm.get(this.formOfEmployment),
        industry: industriesFromForm.get(this.industry),
        politicalSide: politicalSidesFromForm.get(this.politicalSide)
      }
    },
    getEligibleParticipantsCount() {
      console.log(countriesFromForm.get(this.countryOfBirth))
      api.post("/surveys/participants-count", this.getQueryParams(), headers)
          .then(res => {
            this.eligibleParticipants = res.data.numOfUsers
          })
    },
    publishSurvey() {
      const body = {
        surveyParams: {
          title: this.title,
          url: this.url,
          timeToCompleteInSeconds: this.getSeconds(),
          description: this.description,
          spots: this.spots
        },
        queryParams: this.getQueryParams()
      }
      api.post("/surveys", body, headers)
          .then(res => console.log(res.data))
    }
  },
  mounted() {
    this.eligibleParticipants = 0
  }
}
</script>

<style scoped>
@import '../styles/style.css';
</style>
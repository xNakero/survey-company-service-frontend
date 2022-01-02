<template>
  <form @submit.prevent>
    <div>
      <h2>Survey</h2>
      <div>
        <h3>Title</h3>
        <input type="text" v-model="title" placeholder="">
      </div>
      <div>
        <h3>Description</h3>
        <input type="text" v-model="description" placeholder="">
      </div>
      <div>
        <h3>url</h3>
        <input type="text" v-model="url" placeholder="">
      </div>
      <div>
        <h3>Minutes to complete</h3>
        <input type="number" v-model="timeToCompleteInMinutes">
      </div>
      <div>
        <h3>Spots</h3>
        <input type="number" v-model="spots">
      </div>
    </div>
    <div>
      <h2>Participants parameters</h2>
      <div>
        <h3>Minimum age</h3>
        <input type="number" v-model="olderOrEqualThan">
      </div>
      <div>
        <h3>Maximum age</h3>
        <input type="number" v-model="youngerOrEqualThan">
      </div>
      <div>
        <h3>Civil status</h3>
        <select v-model="civilStatus">
          <option></option>
          <option>Single</option>
          <option>Married</option>
          <option>Divorced</option>
          <option>Widow</option>
        </select>
      </div>
      <div>
        <h3>Sex</h3>
        <select v-model="sex">
          <option></option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <h3>Country of birth</h3>
        <select v-model="countryOfBirth">
          <option></option>
          <option>Poland</option>
          <option>Germany</option>
          <option>England</option>
        </select>
      </div>
      <div>
        <h3>Nationality</h3>
        <select v-model="nationality">
          <option></option>
          <option>Poland</option>
          <option>Germany</option>
          <option>England</option>
        </select>
      </div>
      <div>
        <h3>Current country</h3>
        <select v-model="currentCountry">
          <option></option>
          <option>Poland</option>
          <option>Germany</option>
          <option>England</option>
        </select>
      </div>
      <div>
        <h3>First language</h3>
        <select v-model="firstLanguage">
          <option></option>
          <option>Polish</option>
          <option>German</option>
          <option>English</option>
        </select>
      </div>
      <div>
        <h3>Highest education level</h3>
        <select v-model="educationLevel">
          <option></option>
          <option>Primary school</option>
          <option>High school</option>
          <option>Undergraduate</option>
          <option>Graduate</option>
          <option>Doctorate or higher</option>
        </select>
      </div>
      <div>
        <h3>Student status</h3>
        <select v-model="isStudent">
          <option></option>
          <option>true</option>
          <option>false</option>
        </select>
      </div>
      <div>
        <h3>Minimum monthly income</h3>
        <input type="number" v-model="monthlyIncomeHigherOrEqualThan">
      </div>
      <div>
        <h3>minimum monthly income</h3>
        <input type="number" v-model="monthlyIncomeLesserOrEqualThan">
      </div>
      <div>
        <h3>Employment status</h3>
        <select v-model="employmentStatus">
          <option></option>
          <option>Full time</option>
          <option>Part time</option>
          <option>Unemployed</option>
          <option>Retired</option>
        </select>
      </div>
      <div>
        <h3>Form of employment</h3>
        <select v-model="formOfEmployment">
          <option></option>
          <option>Contract of employment</option>
          <option>Contract of mandate</option>
          <option>B2B</option>
        </select>
      </div>
      <div>
        <h3>Industry</h3>
        <select v-model="industry">
          <option></option>
          <option>IT</option>
          <option>Finance</option>
          <option>Trade</option>
        </select>
      </div>
      <div>
        <h3>Political side</h3>
        <select v-model="politicalSide">
          <option></option>
          <option>Left</option>
          <option>Centre</option>
          <option>Right</option>
        </select>
      </div>
    </div>
    <div>
      <button @click="getEligibleParticipantsCount()">Eligible participants</button>
      <h3>Eligible participants: {{ eligibleParticipants }}</h3>
    </div>
    <div>
      <button @click="publishSurvey()">Publish</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8081'
})

const headers = {
  headers: {Authorization: `Bearer ${localStorage.getItem('auth-token')}`}
}

const countries = new Map([
  ['', [null, '']],
  ['POLAND', ['POLAND', 'Poland']],
  ['ENGLAND', ['ENGLAND', 'England']],
  ['GERMANY', ['GERMANY', 'Germany']]
]);

const civilStatuses = new Map([
  ['', [null, '']],
  ['SINGLE', ['SINGLE', 'Single']],
  ['MARRIED', ['MARRIED', 'Married']],
  ['DIVORCED', ['DIVORCED', 'Divorced']],
  ['WIDOW', ['WIDOW', 'Widow']]
]);

const genders = new Map([
  ['', [null, '']],
  ['MALE', ['MALE', 'Male']],
  ['FEMALE', ['FEMALE', 'Female']],
  ['OTHER', ['OTHER', 'Other']]
]);

const languages = new Map([
  ['', [null, '']],
  ['POLISH', ['POLISH', 'Polish']],
  ['ENGLISH', ['ENGLISH', 'English']],
  ['GERMAN', ['GERMAN', 'German']]
]);

const educationLevels = new Map([
  ['', [null, '']],
  ['PRIMARY_SCHOOL', ['PRIMARY_SCHOOL', 'Primary school']],
  ['HIGH_SCHOOL', ['HIGH_SCHOOL', 'High school']],
  ['UNDERGRADUATE', ['UNDERGRADUATE', 'Undergraduate']],
  ['GRADUATE', ['GRADUATE', 'Graduate']],
  ['DOCTORATE_OR_HIGHER', ['DOCTORATE_OR_HIGHER', 'Doctorate or higher']]
]);

const studentStatuses = new Map([
  ['', [null, '']],
  ['true', [true, 'Yes']],
  ['false', [false, 'No']]
]);

const employmentStatuses = new Map([
  ['', [null, '']],
  ['FULL_TIME', ['FULL_TIME', 'Full time']],
  ['PART_TIME', ['PART_TIME', 'Part time']],
  ['UNEMPLOYED', ['UNEMPLOYED', 'Unemployed']],
  ['RETIRED', ['RETIRED', 'Retired']]
]);

const formsOfEmployment = new Map([
  ['', [null, '']],
  ['CONTRACT_OF_EMPLOYMENT', ['CONTRACT_OF_EMPLOYMENT', 'Contract of employment']],
  ['CONTRACT_OF_MANDATE', ['CONTRACT_OF_MANDATE', 'Contract of mandate']],
  ['BUSINESS_TO_BUSINESS', ['BUSINESS_TO_BUSINESS', 'B2B']]
]);

const industries = new Map([
  ['', [null, '']],
  ['IT', ['IT', 'IT']],
  ['FINANCE', ['FINANCE', 'Finance']],
  ['TRADE', ['TRADE', 'Trade']]
])

const politicalSides = new Map([
  ['', [null, '']],
  ['LEFT', ['LEFT', 'Left']],
  ['CENTRE', ['CENTRE', 'Centre']],
  ['RIGHT', ['RIGHT', 'Right']]
])

export default {
  name: "SurveyPublishing",
  props: {
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
        civilStatus: civilStatuses.get(this.civilStatus?.toUpperCase() ?? "")[0],
        sex: genders.get(this.sex?.toUpperCase() ?? "")[0],
        countryOfBirth: countries.get(this.countryOfBirth?.toUpperCase() ?? "")[0],
        nationality: countries.get(this.nationality?.toUpperCase() ?? "")[0],
        currentCountry: countries.get(this.currentCountry?.toUpperCase() ?? "")[0],
        firstLanguage: languages.get(this.firstLanguage?.toUpperCase() ?? "")[0],
        highestEducationLevelAchieved: educationLevels.get(this.educationLevel?.toUpperCase() ?? "")[0],
        isStudent: studentStatuses.get(this?.isStudent ?? "")[0],
        monthlyIncomeHigherOrEqualThan: Math.trunc(this.monthlyIncomeHigherOrEqualThan),
        monthlyIncomeLesserOrEqualThan: Math.trunc(this.monthlyIncomeLesserOrEqualThan),
        employmentStatus: employmentStatuses.get(this.employmentStatus?.toUpperCase() ?? "")[0],
        formsOfEmployment: formsOfEmployment.get(this.formOfEmployment?.toUpperCase() ?? "")[0],
        industry: industries.get(this.industry?.toUpperCase() ?? "")[0],
        politicalSide: politicalSides.get(this.politicalSide?.toUpperCase() ?? "")[0]
      }
    },
    getEligibleParticipantsCount() {
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
  }
}
</script>

<style scoped>

</style>
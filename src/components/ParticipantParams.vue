<template>
  <div v-if="role === 'PARTICIPANT' && loggedIn === true">
    <form @submit.prevent>
      <div>
        <h2>Basic Information</h2>
        <div>
          <h3>Date of birth</h3>
          <input type="date" v-model="dateOfBirth">
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
      </div>
      <div>
        <h2>Demographics</h2>
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
      </div>
      <div>
        <h2>Education</h2>
        <div>
          <h3>Highest education level</h3>
          <select v-model="highestLevel">
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
      </div>
      <div>
        <h2>Work</h2>
        <div>
          <h3>Monthly income in USD</h3>
          <input type="number" v-model="monthlyIncome">
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
      </div>
      <div>
        <h2>Political views</h2>
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
      <button @click="onClick()" class="btn">
        Update
      </button>
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
  name: "ParticipantParams",
  components: {Unauthorized},
  props: {
    role: String,
    loggedIn: Boolean,
    dateOfBirth: Date,
    civilStatus: String,
    sex: String,
    countryOfBirth: String,
    nationality: String,
    currentCountry: String,
    firstLanguage: String,
    highestLevel: String,
    isStudent: String,
    monthlyIncome: Number,
    employmentStatus: String,
    formOfEmployment: String,
    industry: String,
    politicalSide: String
  },
  methods: {
    onClick() {
      const body = {
        basicInformation: {
          dateOfBirth: this.dateOfBirth?.toString ?? null,
          civilStatus: civilStatuses.get(this.civilStatus.toUpperCase())[0],
          sex: genders.get(this.sex.toUpperCase())[0]
        },
        demographics: {
          countryOfBirth: countries.get(this.countryOfBirth.toUpperCase())[0],
          nationality: countries.get(this.nationality.toUpperCase())[0],
          currentCountry: countries.get(this.currentCountry.toUpperCase())[0],
          firstLanguage: languages.get(this.firstLanguage.toUpperCase())[0]
        },
        education: {
          highestEducationLevelAchieved: educationLevels.get(this.highestLevel.toUpperCase())[0],
          isStudent: studentStatuses.get(this.isStudent)[0],
        },
        work: {
          monthlyIncome: Math.trunc(this.monthlyIncome),
          employmentStatus: employmentStatuses.get(this.employmentStatus.toUpperCase())[0],
          formOfEmployment: formsOfEmployment.get(this.formOfEmployment.toUpperCase())[0],
          industry: industries.get(this.industry.toUpperCase())[0]
        },
        politicalViews: {
          politicalSide: politicalSides.get(this.politicalSide.toUpperCase())[0]
        }
      }
      api.put("/personal-profile", body, headers)
          .then(res => {
            if (res.status === 200) {
              console.log("putted")
              console.log(res.data)
            }
          }).catch(res => {
        console.log("error")
        console.log(res.data.errors)
      })
    }
  },
  mounted: function () {
    if (this.role === 'PARTICIPANT' && this.loggedIn) {
      api.get("/personal-profile", headers)
          .then(res => {
            console.log(res.data)
            if (res.status === 200) {
              this.dateOfBirth = res.data.basicInformation.dateOfBirth
              this.civilStatus = civilStatuses.get(res.data.basicInformation?.civilStatus ?? "")[1]
              this.sex = genders.get(res.data.basicInformation?.sex ?? "")[1]
              this.countryOfBirth = countries.get(res.data.demographics?.countryOfBirth ?? "")[1]
              this.nationality = countries.get(res.data.demographics?.nationality ?? "")[1]
              this.currentCountry = countries.get(res.data.demographics?.currentCountry ?? "")[1]
              this.firstLanguage = languages.get(res.data.demographics?.firstLanguage ?? "")[1]
              this.highestLevel = educationLevels.get(res.data.education?.highestEducationLevelAchieved ?? "")[1]
              this.isStudent = studentStatuses.get(res.data.education?.isStudent?.toString() ?? "")[1]
              this.monthlyIncome = res.data.work.monthlyIncome
              this.employmentStatus = employmentStatuses.get(res.data.work?.employmentStatus ?? "")[1]
              this.formOfEmployment = formsOfEmployment.get(res.data.work?.formOfEmployment ?? "")[1]
              this.industry = industries.get(res.data.work?.industry ?? "")[1]
              this.politicalSide = politicalSides.get(res.data.politicalViews?.politicalSide ?? "")[1]
            }
          })
    }
  },
}
</script>

<style scoped>

</style>
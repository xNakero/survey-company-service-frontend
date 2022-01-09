<template>
  <div v-if="role === 'PARTICIPANT' && loggedIn === true" class="main-ui-style">
    <form @submit.prevent>
      <div>
        <h2>Podstawowe informacje</h2>
        <div>
          <h3>Data urodzenia</h3>
          <input type="date" v-model="dateOfBirth" class="input-box-form-date" placeholder="">
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
      </div>
      <div class="category-line"/>
      <div>
        <h2>Dane demograficzne</h2>
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
      </div>
      <div class="category-line"/>
      <div>
        <h2>Edukacja</h2>
        <div>
          <h3>Najwyższy skończony poziom edukacji</h3>
          <select v-model="highestLevel" class="input-box-form-select">
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
      </div>
      <div class="category-line"/>
      <div>
        <h2>Informacje o zatrudnieniu</h2>
        <div>
          <h3>Miesięczny dochód netto w złotówkach</h3>
          <input type="number" v-model="monthlyIncome" class="input-box-form-number">
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
      </div>
      <div class="category-line"/>
      <div>
        <h2>Poglądy</h2>
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
      <button @click="onClick()" class="form-button">
        Aktualizuj
      </button>
      <div class="margin-under-publish"/>
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
  headers: {Authorization: `Bearer ${localStorage.getItem("auth-token")}`}
}

const countriesFromResponse = new Map([
  [null, ''],
  ['POLAND', 'Polska'],
  ['ENGLAND', 'Anglia'],
  ['GERMANY', 'Niemcy']
]);

const civilStatusesFromResponse = new Map([
  [null, ''],
  ['SINGLE', 'Single'],
  ['MARRIED', 'Żonaty'],
  ['DIVORCED', 'Rozwiedziony'],
  ['WIDOW', 'Wdowa']
]);

const gendersFromResponse = new Map([
  [null, ''],
  ['MALE', 'Mężczyzna'],
  ['FEMALE', 'Kobieta'],
  ['OTHER', 'Inna']
]);

const languagesFromResponse = new Map([
  [null, ''],
  ['POLISH', 'Polski'],
  ['ENGLISH', 'Angielski'],
  ['GERMAN', 'Niemiecki']
]);

const educationLevelsFromResponse = new Map([
  [null, ''],
  ['PRIMARY_SCHOOL', 'Wykształcenie podstawowe'],
  ['HIGH_SCHOOL', 'Wykształcenie średnie'],
  ['UNDERGRADUATE', 'Student uczelni wyższej'],
  ['GRADUATE', 'Inżynier/Licencjat/Magister'],
  ['DOCTORATE_OR_HIGHER', 'Doktorat lub wyżej']
]);

const studentStatusesFromResponse = new Map([
  [null, ''],
  [true, 'Tak'],
  [false, 'Nie']
]);

const employmentStatusesFromResponse = new Map([
  [null, ''],
  ['FULL_TIME', 'Pełen etat'],
  ['PART_TIME', 'Część etatu'],
  ['UNEMPLOYED', 'Bezrobotny'],
  ['RETIRED', 'Emeryt']
]);

const formsOfEmploymentFromResponse = new Map([
  [null, ''],
  ['CONTRACT_OF_EMPLOYMENT', 'Umowa o pracę'],
  ['CONTRACT_OF_MANDATE', 'Umowa zlecenie'],
  ['BUSINESS_TO_BUSINESS', 'Własna działalność gospodarcza']
]);

const industriesFromResponse = new Map([
  [null, ''],
  ['IT', 'IT'],
  ['FINANCE', 'Finanse'],
  ['TRADE', 'Handel']
])

const politicalSidesFromResponse = new Map([
  [null, ''],
  ['LEFT', 'Lewica'],
  ['CENTRE', 'Centralne'],
  ['RIGHT', 'Prawica']
])

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
  name: "ParticipantParams",
  components: {Unauthorized},
  props: {
    role: String,
    loggedIn: Boolean,
    dateOfBirth: String,
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
          dateOfBirth: this.dateOfBirth ?? null,
          civilStatus: civilStatusesFromForm.get(this.civilStatus),
          sex: gendersFromForm.get(this.sex)
        },
        demographics: {
          countryOfBirth: countriesFromForm.get(this.countryOfBirth),
          nationality: countriesFromForm.get(this.nationality),
          currentCountry: countriesFromForm.get(this.currentCountry),
          firstLanguage: languagesFromForm.get(this.firstLanguage)
        },
        education: {
          highestEducationLevelAchieved: educationLevelsFromForm.get(this.highestLevel),
          isStudent: studentStatusesFromForm.get(this.isStudent),
        },
        work: {
          monthlyIncome: Math.trunc(this.monthlyIncome),
          employmentStatus: employmentStatusesFromForm.get(this.employmentStatus),
          formOfEmployment: formsOfEmploymentFromForm.get(this.formOfEmployment),
          industry: industriesFromForm.get(this.industry)
        },
        politicalViews: {
          politicalSide: politicalSidesFromForm.get(this.politicalSide)
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
    console.log(headers)
    if (this.role === 'PARTICIPANT' && this.loggedIn) {
      api.get("/personal-profile", headers)
          .then(res => {
            console.log(res.data)
            console.log(educationLevelsFromResponse.get(res.data.education?.highestEducationLevelAchieved ?? ""))
            if (res.status === 200) {
              this.dateOfBirth = res.data.basicInformation.dateOfBirth
              this.civilStatus = civilStatusesFromResponse.get(res.data.basicInformation?.civilStatus ?? "")
              this.sex = gendersFromResponse.get(res.data.basicInformation?.sex ?? "")
              this.countryOfBirth = countriesFromResponse.get(res.data.demographics?.countryOfBirth ?? "")
              this.nationality = countriesFromResponse.get(res.data.demographics?.nationality ?? "")
              this.currentCountry = countriesFromResponse.get(res.data.demographics?.currentCountry ?? "")
              this.firstLanguage = languagesFromResponse.get(res.data.demographics?.firstLanguage ?? "")
              this.highestLevel = educationLevelsFromResponse.get(res.data.education?.highestEducationLevelAchieved ?? "")
              this.isStudent = studentStatusesFromResponse.get(res.data.education?.isStudent ?? "")
              this.monthlyIncome = res.data.work.monthlyIncome
              this.employmentStatus = employmentStatusesFromResponse.get(res.data.work?.employmentStatus ?? "")
              this.formOfEmployment = formsOfEmploymentFromResponse.get(res.data.work?.formOfEmployment ?? "")
              this.industry = industriesFromResponse.get(res.data.work?.industry ?? "")
              this.politicalSide = politicalSidesFromResponse.get(res.data.politicalViews?.politicalSide ?? "")
            }
          })
    }
  },
}
</script>

<style scoped>
@import '../styles/style.css';
</style>
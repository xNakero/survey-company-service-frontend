<template>
  <div class="main-ui-style">
    <h1>Aktywne ankiety</h1>
    <ol class="list">
      <li class="list-element" v-for="survey in surveys" v-bind:key="survey.surveyId">
        <div>
          <h2 class="list-element-title">{{ survey.title }}</h2>
        </div>
        <div class="list-element-one-in-line">{{ survey.description }}</div>
        <div class="list-element-one-in-line">{{ survey.url }}</div>
        <div class="list-element">
          <span class="list-element-multiple-in-line">Łączna ilość miejsc: {{ survey.spotsTotal }}</span>
          <span class="list-element-multiple-in-line">Miejsca zajęte: {{ survey.spotsTaken }}</span>
        </div>
        <div class="list-element-one-in-line">Rozpoczęto: {{ survey.startedAt }}</div>
        <div class="list-element-one-in-line">Kod potwierdzający wykonanie ankiety: {{ survey.completionCode }}</div>
        <div class="list-element-one-in-line">Czas na ukończenie ankiety: {{ survey.timeToComplete }}</div>
        <div>
          <button class="list-button-red" @click="finishSurvey(survey.surveyId)">Zakończ wcześniej</button>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8081'
})

const headers = {
  headers: {Authorization: `Bearer ${localStorage.getItem('auth-token')}`}
}

export default {
  name: "ResearcherSurveys",
  props: {
    surveys: []
  },
  methods: {
    getSurveys() {
      api.get("/surveys", headers)
          .then(res => {
            if (res.data.type === 'RESEARCHER') {
              this.surveys = res.data.surveys.activeSurveys
            } else {
              console.log("didn't fetch researcher surveys.")
            }
          })
    },
    finishSurvey(surveyId) {
      console.log(surveyId)
      const body = {action: "FINISH"}
      api.put("/surveys/" + surveyId, body, headers)
      .then(res => {
        if (res.status === 200) {
          console.log("scheduled")
        } else {
          console.log("finishing survey failed.")
        }
      })
    }
  },
  mounted() {
    this.getSurveys()
  }
}
</script>

<style scoped>

</style>